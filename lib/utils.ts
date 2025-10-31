import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export function searchForMedicine(searchTerm: string) {
  const csvPath = path.join(process.cwd(), 'data', 'Medicine_Details.csv');
  const fileContent = fs.readFileSync(csvPath, 'utf8');

  // Parse CSV
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  });

  
  // Search for the name
  let match: any[] = records.filter((row: any) =>
    row.name.toLowerCase().includes(searchTerm)
  );

  // Remove duplicates by name
  match = match.filter(
    (row, index, self) =>
      index === self.findIndex((r) => r.name.toLowerCase() === row.name.toLowerCase())
  );

  if (match.length > 1) {
    return {
      fulfillmentMessages: [
        {
          text: { text: ["Several medications with this name have been found.", "Please select the desired medication."] },

        },
        {
          payload: {
            richContent: [[{
              options: match.map(m => ({text: `Looking for ${m.name}`})),
              type: 'chips'
            }]]
          }
        }
      ],
    }
  }

  // Build response message
  const responseText = match.length == 1
    ? `Found ${match[0].name}:`
    : `Sorry, I couldn't find "${searchTerm}" in the list.`;

  return {
    fulfillmentMessages: [
      {
        text: { text: [responseText] },
      },
      {
        payload: match.length == 1 ? {
          richContent: [[
            {
              rawUrl: match[0].image_URL,
              type: "image",
              accessibilityText: `${match[0].name} image`
            },
            {
              type: "info",
              title: "Uses",
              subtitle: match[0].uses,
            },
            {
              type: 'divider'
            },
            {
              type: 'description',
              title: 'Manufacturer',
              text: [
                match[0].manufacturer
              ]
            },
            {
              type: 'description',
              title: 'Composition',
              text: [
                match[0].composition
              ]
            }
          ]]
        } : {}
      }
    ]
  }
}