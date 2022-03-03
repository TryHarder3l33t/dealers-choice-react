const Sequelize = require("sequelize");

const conn = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/acme_db"
);

//User/Table model
const User = conn.define(
  "user",
  {
    name: Sequelize.DataTypes.STRING,
    bio: Sequelize.DataTypes.TEXT,
  },
  {
    hooks: {
      beforeCreate: function (user) {
        if (!user.bio) {
          user.bio = `This is a DEFAULT bio, a happy bio, about living in Ohio. Where do you live? Do you live in Ohio, would you like a bio? This is silly probably written by Billy or his girl Jilly`;
        }
        console.log(user);
      },
    },
  }
);

//Class method name: name
User.createWithName = ({ name, bio }) =>
  User.create({
    name,
    bio,
  });

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  //Nice way to const jimmy = await User.create({'jimmy'})
  const [moe, lucy, curly] = await Promise.all(
    [
      {
        name: "lucy",
        bio: `Lucille Désirée Ball an American actress, comedian, and producer. She was nominated for 13 Primetime Emmy Awards, winning five times, and was the recipient of several other accolades, such as the Golden Globe Cecil B. DeMille Award and two stars on the Hollywood Walk of Fame. Ball earned many honors, including the Women in Film Crystal Award, an induction into the Television Hall of Fame, the Lifetime Achievement Award from the Kennedy Center Honors, and the Governors Award from the Academy of Television Arts & Sciences.`,
      },
      {
        name: "moe",
      },
      {
        name: "curly",
        bio: `Jerome Lester Horwitz , known professionally as Curly Howard, was an American vaudevillian actor and comedian. He was best known as a member of the American comedy team the Three Stooges, which also featured his elder brothers Moe and Shemp Howard and actor Larry Fine. In early shorts, he was billed as Curley. Curly Howard was generally considered the most popular and recognizable of the Stooges. He was well known for his high-pitched voice and vocal expressions ("nyuk-nyuk-nyuk!", "woob-woob-woob!", "soitenly!" [certainly], "I'm a victim of soikemstance", and barking like a dog), as well as his physical comedy (e.g., falling on the ground and pivoting on his shoulder as he "walked" in circular motion), improvisations, and athleticism. An untrained actor, Curly borrowed (and significantly exaggerated) the "woob woob" from "nervous" and soft-spoken comedian Hugh Herbert. Curly's unique version of "woob-woob-woob" was firmly established by the time of the Stooges' second Columbia film, Punch Drunks (1934).`,
      },
    ].map(User.createWithName)
  );
  console.log(lucy.get());
  console.log(moe.get());
  console.log(curly.get());
};

module.exports = {
  models: {
    User,
  },
  syncAndSeed,
};
