const queryBuilder = require('./index')

test('generates query', () => {
  const query = queryBuilder({
    type: 'query',
    operation: 'thoughts',
    fields: ['id', 'name', 'thought']
  })

  expect(query).toEqual({
    query: `query  {
              thoughts  {
                id, name, thought
              }
            }`,
    variables: {}
  })
})

test('generates query with params', () => {
  const query = queryBuilder({
    type: 'query',
    operation: 'thought',
    data: { id: 1 },
    fields: ['id', 'name', 'thought']
  })

  expect(query).toEqual({
    query: `query ($id: Int) {
              thought (id: $id) {
                id, name, thought
              }
            }`,
    variables: { id: 1 }
  })
})

test('generates mutation query', () => {
  const query = queryBuilder({
    type: 'mutation',
    operation: 'thoughtCreate',
    data: {
      name: "Tyrion Lannister",
      thought: "I drink and I know things."
    },
    fields: ['id']
  })

  expect(query).toEqual({
    query: `mutation ($name: String, $thought: String) {
              thoughtCreate (name: $name, thought: $thought) {
                id
              }
            }`,
    variables: { name: "Tyrion Lannister", thought: "I drink and I know things." }
  })
})

test('generates query with sub fields selection', () => {
  const query = queryBuilder({
    type: 'query',
    operation: 'orders',
    fields: [
      'id',
      'amount',
      {
        user: [
          'id',
          'name',
          'email',
          {
            address: [
              'city',
              'country'
            ]
          }
        ]
      }
    ]
  })

  expect(query).toEqual({
    query: `query  {
              orders  {
                id, amount, user { id, name, email, address { city, country } }
              }
            }`,
    variables: {}
  })
})
