/**
 * ! Executing this script will delete all data in your database and seed it with 10 variable.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
*/
import { createSeedClient } from "@snaplet/seed";
import { Selectors, Types } from '@/lib/metadata/constants';
import { copycat } from "@snaplet/copycat";

const main = async () => {
  const seed = await createSeedClient();

  // Truncate all tables in the database
  await seed.$resetDatabase();

  // Seed the database with 10 variable
  await seed.variable((x) =>
    x(5, {
      selector: Selectors.FREE_INPUT,

      type: (ctx) => copycat.oneOf(ctx.seed, [Types.INTEGER, Types.STRING, Types.FLOAT]),

      // Value must correspond to the type
      value: (ctx) => {
        switch (ctx.data.type) {
          case Types.INTEGER:
            return copycat.int(ctx.seed, { min: 0, max: 100 }).toString();
          case Types.STRING:
            return copycat.word(ctx.seed).toString();
          case Types.FLOAT:
            return copycat.float(ctx.seed, { min: 0, max: 100 }).toString();

          // It should never reach this stage
          default:
            return "Invalid type";
        }
      }
    })
  )

  // Type completion not working? You might want to reload your TypeScript Server to pick up the changes
  console.log("Database seeded successfully!");

  process.exit();
};

main();