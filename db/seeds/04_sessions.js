
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('sessions').del()
    .then(function () {
      // Inserts seed entries
      return knex('sessions').insert([
        // {id: 1, queue_id: 1, request_id: 1, session_status: 'started'},
        // {id: 2, queue_id: 4, request_id: 4, session_status: 'paused'},
        // {id: 3, queue_id: 5, request_id: 5, session_status: 'started'}
      ]);
    }).then(() => {
      return knex.raw(
        `SELECT setval('sessions_id_seq', (SELECT MAX(id) FROM sessions));`
      )
    })
};
