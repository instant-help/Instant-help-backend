
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { id: 1, username:'a', password:'$2a$10$Ynce0EsLn4dA1ESQyM0sgucKseOsYIIEdwg7OJAbvZ1vqmKM5GhA2' },
        { id: 2, username:'Chris', password:'$2a$10$Ynce0EsLn4dA1ESQyM0sgucKseOsYIIEdwg7OJAbvZ1vqmKM5GhA2' },
      ]);
    });
};
