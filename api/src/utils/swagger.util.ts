import swaggerJSDoc from "swagger-jsdoc"

const swaggerOptions = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'OrderKit API',
            version: '1.0.0',
            description: 'The API for the OrderKit app.',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
        components: {
            "securitySchemes": {
                "x-auth-token": {
                    type: "apiKey",
                    in: "header",
                    name: "x-auth-token",
                    description: "JWT header and payload for authentication"
                },
                jwt: {
                    type: "apiKey",
                    in: "cookie",
                    name: "jwt",
                    description: "JWT signature for authentication"
                }
            },
            parameters: {
                Origin: {
                    in: 'header',
                    name: 'Origin',
                    description: 'Origin header for CORS',
                    required: false,
                    schema: {
                        type: 'string',
                    },
                },
                'Referer': {
                    in: 'header',
                    name: 'Referer',
                    description: 'Referer header for CORS',
                    required: false,
                    schema: {
                        type: 'string',
                    },
                },
                'x-auth-token': {
                    in: 'header',
                    name: 'x-auth-token',
                    description: 'JWT header and payload for authentication',
                    required: true,
                    schema: {
                        type: 'string',
                    },
                },
                'x-requested-with': {
                    in: 'header',
                    name: 'x-requested-with',
                    description: 'Request type, should be XMLHttpRequest',
                    required: true,
                    schema: {
                        type: 'string',
                    },
                },
                'jwt': {
                    in: 'cookie',
                    name: 'jwt',
                    required: true,
                    description: 'JWT signature for authentication',
                    schema: {
                        type: 'string',
                    }
                }
            },
            schemas: {
                MenuItemCategory: {
                    type: 'string',
                    description: 'The category that the menu item belongs to.',
                    enum: ['food', 'drinks'],
                },
                MenuItem: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'The unique identifier of the menu item.',
                        },
                        name: {
                            type: 'string',
                            description: 'The name of the menu item.',
                        },
                        price: {
                            type: 'number',
                            description: 'The price that the menu item is sold for.',
                        },
                        category: {
                            $ref: '#/components/schemas/MenuItemCategory',
                        },
                        estimatedPrepTime: {
                            type: 'number',
                            description: 'The estimated time it takes to prepare the menu item.',
                        },
                        cost: {
                            type: 'number',
                            description: 'The cost of the menu item.',
                        },
                        createdAt: {
                            type: 'string',
                            description: 'The date and time that the menu item was created.',
                        },
                        updatedAt: {
                            type: 'string',
                            description: 'The date and time that the menu item was last updated.',
                        },
                    },
                },
                OrderStatus: {
                    type: 'string',
                    enum: ['new', 'preparing', 'done', 'served', 'paid'],
                    description: 'Status of the order',
                },
                OrderMenuItemStatus: {
                    type: 'string',
                    enum: ['new', 'preparing', 'done'],
                    description: 'Status of the menu item in the order',
                },
                OrderMenuItem: {
                    type: 'object',
                    description: 'Menu item in an order. This is a MenuItem with an additional status property, which only exists in the context of an order.',
                    allOf: [
                        {
                            $ref: '#/components/schemas/MenuItem'
                        },
                        {
                            properties: {
                                status: {
                                    $ref: '#/components/schemas/OrderMenuItemStatus',
                                },
                            },
                            required: ['status'],
                        }
                    ],
                    required: ['status'],
                },
                Order: {
                    type: 'object',
                    properties: {
                        number: {
                            type: 'number',
                            description: 'Order number',
                        },
                        table: {
                            type: 'number',
                            description: 'Table number',
                        },
                        items: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/OrderMenuItem',
                            },
                        },
                        status: {
                            $ref: '#/components/schemas/OrderStatus',
                        },
                        type: {
                            $ref: '#/components/schemas/MenuItemCategory',
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Order creation timestamp',
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Order last update timestamp',
                        },
                        paid: {
                            type: 'boolean',
                            description: 'Whether the order is paid or not',
                        },
                    },
                    required: ['number', 'table', 'items', 'status', 'type', 'createdAt', 'updatedAt', 'paid'],
                },
                Table: {
                    type: 'object',
                    properties: {
                        number: {
                            type: 'number',
                            description: 'Unique table number',
                        },
                        seats: {
                            type: 'number',
                            description: 'Number of seats at the table',
                        },
                        occupancy: {
                            type: 'number',
                            description: 'Current occupancy of the table',
                            default: 0,
                        },
                        waiterId: {
                            type: 'string',
                            format: 'ObjectId',
                            description: 'Reference to the waiter assigned to the table',
                        },
                        orders: {
                            type: 'array',
                            items: {
                                type: 'string',
                                format: 'ObjectId',
                            },
                            description: 'List of order IDs associated with the table',
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Table creation timestamp',
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Table last update timestamp',
                        },
                    },
                    required: ['number', 'seats', 'occupancy'],
                },
                UserRole: {
                    type: 'string',
                    enum: ['waiter', 'cook', 'bartender', 'cashier'],
                    description: 'Role of the user',
                },
                User: {
                    type: 'object',
                    properties: {
                        username: {
                            type: 'string',
                            description: 'Unique username of the user',
                        },
                        password: {
                            type: 'string',
                            description: 'Password of the user',
                        },
                        name: {
                            type: 'string',
                            description: 'Full name of the user',
                        },
                        role: {
                            $ref: '#/components/schemas/UserRole',
                        },
                        statistics: {
                            type: 'object',
                            properties: {
                                orders: {
                                    type: 'number',
                                    description: 'Number of orders associated with the user',
                                    default: 0,
                                },
                                revenue: {
                                    type: 'number',
                                    description: 'Total revenue associated with the user',
                                    default: 0,
                                },
                            },
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'User creation timestamp',
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'User last update timestamp',
                        },
                    },
                    required: ['username', 'password', 'name', 'role'],
                },
                UpdateOrderRequest: {
                    type: 'object',
                    properties: {
                        status: {
                            $ref: '#/components/schemas/OrderStatus',
                        },
                        items: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/OrderMenuItem',
                            },
                        },
                    },
                },
                CreateOrderRequest: {
                    type: 'object',
                    properties: {
                        table: {
                            type: 'number',
                            description: 'Table number',
                        },
                        items: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    _id: {
                                        type: 'string',
                                        format: 'ObjectId',
                                        description: 'ID of the menu item',
                                    },
                                    count: {
                                        type: 'number',
                                        description: 'Count of the menu item in the order',
                                    },
                                },
                                required: ['_id', 'count'],
                            },
                        },
                        type: {
                            $ref: '#/components/schemas/MenuItemCategory',
                        },
                    },
                    required: ['table', 'items', 'type'],
                },
                UpdateBulkOrderRequest: {
                    type: 'object',
                    properties: {
                        orders: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/Order',
                            },
                        },
                    },
                },
                LoginRequest: {
                    type: 'object',
                    properties: {
                        username: {
                            type: 'string',
                        },
                        password: {
                            type: 'string',
                        },
                    },
                },
                LoginResponse: {
                    type: 'object',
                    properties: {
                        header: {
                            type: 'string',
                        },
                        payload: {
                            type: 'string',
                        },
                        expiration: {
                            type: 'string',
                        },
                        role: {
                            type: 'string',
                        },
                        userId: {
                            type: 'string',
                        },
                    },
                },
                RegistrationRequest: {
                    type: 'object',
                    properties: {
                        username: {
                            type: 'string',
                        },
                        password: {
                            type: 'string',
                        },
                        name: {
                            type: 'string',
                        },
                        role: {
                            type: 'string',
                        },
                    },
                },
            },
        },
    },
    apis: [
        `./routers/*.ts`,
        "./dist/routers/*.js"
    ],
}

export const specs = swaggerJSDoc(swaggerOptions)
