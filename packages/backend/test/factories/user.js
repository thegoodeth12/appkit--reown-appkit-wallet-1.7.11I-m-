import { faker } from '@faker-js/faker';
import { createRole } from '@/factories/role.js';
import User from '@/models/user.js';

export const createUser = async (params = {}) => {
  params.roleId = params?.roleId || (await createRole()).id;
  params.fullName = params?.fullName || faker.person.fullName();
  params.email = params?.email || faker.internet.email();
  params.password = params?.password || faker.internet.password();
  params.status = params?.status || 'active';

  const user = await User.query().insertAndFetch(params);

  return user;
};
