import { describe, it, expect, beforeEach } from 'vitest';
import { createRole } from '@/factories/role.js';
import roleSerializer from '@/serializers/role.js';
import permissionSerializer from '@/serializers/permission.js';
import { createPermission } from '@/factories/permission.js';

describe('roleSerializer', () => {
  let role, permissionOne, permissionTwo;

  beforeEach(async () => {
    role = await createRole();

    permissionOne = await createPermission({
      roleId: role.id,
      action: 'read',
      subject: 'User',
    });

    permissionTwo = await createPermission({
      roleId: role.id,
      action: 'read',
      subject: 'Role',
    });
  });

  it('should return role data', async () => {
    const expectedPayload = {
      id: role.id,
      name: role.name,
      key: role.key,
      description: role.description,
      createdAt: role.createdAt.getTime(),
      updatedAt: role.updatedAt.getTime(),
      isAdmin: role.isAdmin,
    };

    expect(roleSerializer(role)).toStrictEqual(expectedPayload);
  });

  it('should return role data with the permissions', async () => {
    role.permissions = [permissionOne, permissionTwo];

    const expectedPayload = {
      permissions: [
        permissionSerializer(permissionOne),
        permissionSerializer(permissionTwo),
      ],
    };

    expect(roleSerializer(role)).toMatchObject(expectedPayload);
  });
});
