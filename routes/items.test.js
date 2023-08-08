process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('../app');

let items = require('../fakeDb');
let item = {name: 'oreos' , price: 5}

beforeEach(async () => {
    items.push(item)
});

afterEach(async () => {
    items.length = 0
});

describe('get /items', () => {
    test('gets the list of items',async () => {
        const res = await request(app).get('/items');
        const {items} = res.body;
        expect(res.statusCode).toBe(200);
        expect(items).toHaveLength(1);
    });
});

describe('get /items/:name', () => {
    test('gets an individual item from the db',async () => {
        const res = await request(app).get(`/items/${item.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.item).toEqual(item);
    });
    test('that the server 404s an unknown item',async ()=> {
        const res = await request(app).get('/items/0');
        expect(res.statusCode).toBe(404);
    });
});

describe('post /items', () => {
    test('adds item to db',async () => {
        const res = await request(app).post('/items').send({name: 'cookies',price: 3});
        expect(res.statusCode).toBe(200);
        expect(res.body.item.name).toEqual('cookies')
        expect(res.body.item.price).toEqual(3)
    });
});

describe('patch /items/:name', () => {
    test('updates an individual item',async () => {
        const res = await request(app).patch(`/items/${item.name}`).send({name:'candy bar'});
        expect(res.statusCode).toBe(200);
        expect(res.body.item).toEqual({name: 'candy bar'});
    });
    test('that the server 404s an unknown item',async ()=> {
        const res = await request(app).patch('/items/0');
        expect(res.statusCode).toBe(404);
    });
});

describe('delete /items/:name', () => {
    test('deletes an individual item',async () => {
        const res = await request(app).delete(`/items/${item.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({msg: 'Deleted'});
    });
});