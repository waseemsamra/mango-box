// Database schemas for all collections

export const productSchema = {
  version: 1,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 100,
    },
    name: {
      type: 'string',
      minLength: 1,
      maxLength: 200,
    },
    description: {
      type: 'string',
      maxLength: 1000,
    },
    price: {
      type: 'number',
      minimum: 0,
      maximum: 1000000,
      multipleOf: 0.01,
    },
    categoryId: {
      type: 'string',
      maxLength: 100,
      ref: 'categories',
    },
    unitId: {
      type: 'string',
      maxLength: 100,
      ref: 'units',
    },
    originId: {
      type: 'string',
      maxLength: 100,
      ref: 'origins',
    },
    currencyId: {
      type: 'string',
      maxLength: 100,
      ref: 'currencies',
    },
    images: {
      type: 'array',
      items: {
        type: 'string',
        maxLength: 500,
      },
    },
    stock: {
      type: 'number',
      minimum: 0,
      maximum: 10000,
      multipleOf: 1,
    },
    sku: {
      type: 'string',
      maxLength: 50,
    },
    status: {
      type: 'string',
      maxLength: 20,
      enum: ['Active', 'Inactive', 'Out of Stock'],
      default: 'Active',
    },
    featured: {
      type: 'boolean',
      default: false,
    },
    rating: {
      type: 'number',
      minimum: 0,
      maximum: 5,
      multipleOf: 0.1,
      default: 0,
    },
    reviewCount: {
      type: 'number',
      minimum: 0,
      maximum: 10000,
      multipleOf: 1,
      default: 0,
    },
    createdAt: {
      type: 'string',
      maxLength: 50,
      format: 'date-time',
    },
    updatedAt: {
      type: 'string',
      maxLength: 50,
      format: 'date-time',
    },
    slug: {
      type: 'string',
      maxLength: 200,
      pattern: '^[a-z0-9-]+$',
    },
  },
  required: ['id', 'name', 'price', 'categoryId', 'unitId', 'originId', 'currencyId', 'featured', 'slug'],
  indexes: ['categoryId', 'unitId', 'originId', 'status', 'featured', 'slug'],
};

export const categorySchema = {
  version: 1,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 100,
    },
    name: {
      type: 'string',
      minLength: 1,
      maxLength: 200,
    },
    slug: {
      type: 'string',
      maxLength: 200,
      pattern: '^[a-z0-9-]+$',
    },
    description: {
      type: 'string',
      maxLength: 1000,
    },
    parentId: {
      type: 'string',
      maxLength: 100,
      ref: 'categories',
    },
    image: {
      type: 'string',
      maxLength: 500,
    },
    displayPriority: {
      type: 'number',
      minimum: 0,
      maximum: 1000,
      multipleOf: 1,
    },
    status: {
      type: 'string',
      maxLength: 20,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
    productCount: {
      type: 'number',
      minimum: 0,
      maximum: 10000,
      multipleOf: 1,
    },
    createdAt: {
      type: 'string',
      maxLength: 50,
      format: 'date-time',
    },
    updatedAt: {
      type: 'string',
      maxLength: 50,
      format: 'date-time',
    },
  },
  required: ['id', 'name', 'slug', 'status'],
  indexes: ['slug', 'parentId', 'status', 'displayPriority'],
};

export const unitSchema = {
  version: 1,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 100,
    },
    name: {
      type: 'string',
      minLength: 1,
      maxLength: 100,
    },
    abbreviation: {
      type: 'string',
      minLength: 1,
      maxLength: 10,
    },
    type: {
      type: 'string',
      maxLength: 20,
      enum: ['Weight', 'Quantity', 'Volume', 'Length', 'Area', 'Time'],
    },
    baseValue: {
      type: 'number',
      minimum: 0,
      maximum: 1000000,
      multipleOf: 0.001,
    },
    status: {
      type: 'string',
      maxLength: 20,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
    createdAt: {
      type: 'string',
      maxLength: 50,
      format: 'date-time',
    },
    updatedAt: {
      type: 'string',
      maxLength: 50,
      format: 'date-time',
    },
  },
  required: ['id', 'name', 'abbreviation', 'type', 'baseValue', 'status'],
  indexes: ['type', 'status', 'abbreviation'],
};

export const originSchema = {
  version: 1,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 100,
    },
    name: {
      type: 'string',
      minLength: 1,
      maxLength: 200,
    },
    region: {
      type: 'string',
      maxLength: 200,
    },
    country: {
      type: 'string',
      minLength: 1,
      maxLength: 100,
    },
    code: {
      type: 'string',
      maxLength: 10,
    },
    status: {
      type: 'string',
      maxLength: 20,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
    productCount: {
      type: 'number',
      minimum: 0,
      maximum: 10000,
      multipleOf: 1,
    },
    createdAt: {
      type: 'string',
      maxLength: 50,
      format: 'date-time',
    },
    updatedAt: {
      type: 'string',
      maxLength: 50,
      format: 'date-time',
    },
  },
  required: ['id', 'name', 'region', 'country', 'code', 'status'],
  indexes: ['country', 'region', 'status', 'code'],
};

export const currencySchema = {
  version: 1,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 100,
    },
    name: {
      type: 'string',
      minLength: 1,
      maxLength: 200,
    },
    code: {
      type: 'string',
      minLength: 3,
      maxLength: 3,
      pattern: '^[A-Z]{3}$',
    },
    symbol: {
      type: 'string',
      maxLength: 5,
    },
    exchangeRate: {
      type: 'number',
      minimum: 0,
      maximum: 10000,
      multipleOf: 0.01,
    },
    isBase: {
      type: 'boolean',
      default: false,
    },
    status: {
      type: 'string',
      maxLength: 20,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
    createdAt: {
      type: 'string',
      maxLength: 50,
      format: 'date-time',
    },
    updatedAt: {
      type: 'string',
      maxLength: 50,
      format: 'date-time',
    },
  },
  required: ['id', 'name', 'code', 'symbol', 'exchangeRate', 'isBase', 'status'],
  indexes: ['code', 'isBase', 'status'],
};

export const userSchema = {
  version: 1,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 100,
    },
    name: {
      type: 'string',
      minLength: 1,
      maxLength: 200,
    },
    email: {
      type: 'string',
      format: 'email',
      maxLength: 200,
    },
    password: {
      type: 'string',
      minLength: 6,
      maxLength: 255,
    },
    role: {
      type: 'string',
      maxLength: 20,
      enum: ['Admin', 'Manager', 'Staff'],
      default: 'Staff',
    },
    permissions: {
      type: 'array',
      items: {
        type: 'string',
        maxLength: 100,
      },
    },
    status: {
      type: 'string',
      maxLength: 20,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
    lastLogin: {
      type: 'string',
      maxLength: 50,
      format: 'date-time',
    },
    createdAt: {
      type: 'string',
      maxLength: 50,
      format: 'date-time',
    },
    updatedAt: {
      type: 'string',
      maxLength: 50,
      format: 'date-time',
    },
  },
  required: ['id', 'name', 'email', 'password', 'role', 'status'],
  indexes: ['email', 'role', 'status'],
};
