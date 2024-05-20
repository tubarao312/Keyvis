/**
 * ! Executing this script will delete all data in your database and seed it with 10 variable.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
*/
import { createSeedClient } from "@snaplet/seed";
import { Selectors, Types } from '@/lib/metadata/constants';

const main = async () => {
  const seed = await createSeedClient();

  // Truncate all tables in the database
  await seed.$resetDatabase();

  // Seed the database with 10 variable
  await seed.variable((x) =>
    x(5, {
      selector: Selectors.FREE_INPUT,
      type: Types.STRING,
    })
  )

  // Type completion not working? You might want to reload your TypeScript Server to pick up the changes
  console.log("Database seeded successfully!");

  process.exit();
};

main();