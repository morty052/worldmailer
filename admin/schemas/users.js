export default {
  name: 'users',
  type: 'document',
  title: 'Users',
  fields: [
    {
      name: 'username',
      type: 'string',
      title: 'username',
    },
    {
      name: 'email',
      type: 'string',
      title: 'Email',
    },
    {
      name: 'password',
      type: 'string',
      title: 'Password',
    },
    {
      name: 'plan',
      type: 'object',
      fields: [
        {
          name: 'admin',
          type: 'boolean',
          title: 'Admin',
        },
        {
          name: 'premium',
          type: 'boolean',
          title: 'Premium',
        },
        {
          name: 'free',
          type: 'boolean',
          title: 'Free',
        },
      ],
    },
    // user file array
    {
      name: 'files',
      type: 'array',
      title: 'Files',
      of: [
        {
          type: 'object',
          name: 'docs',
          title: 'Docs',
          fields: [
            {
              name: 'name',
              type: 'string',
              title: 'Name',
            },
            {
              type: 'file',
              name: 'doc',
              title: 'Doc',
            },
          ],
        },
      ],
    },
  ],
}
