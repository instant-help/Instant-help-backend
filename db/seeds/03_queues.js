
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('queues').del()
    .then(function () {
      // Inserts seed entries
      return knex('queues').insert([
        {id: 1, helper_id: 10, request_id: 1},
        {id: 2, helper_id: 10, request_id: 2},
        {id: 3, helper_id: 10, request_id: 3},
        {id: 4, helper_id: 9, request_id: 4},
        {id: 5, helper_id: 8, request_id: 5},
      ]);
    }).then(() => {
      return knex.raw(
        `SELECT setval('queues_id_seq', (SELECT MAX(id) FROM queues));`
      )
    })
};
