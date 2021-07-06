export default async (ctx, db) => {
  const hunt = await ctx.character.loadCurrentHunt(db);
  if (hunt) {
    throw new Error('You are currently on a hunt! It would be dangerous to do that right now.');
  }
};
