import { INVENTORY } from '../__mocks__/inventory.js';
import { InventoryManager } from '../u1/u1e1.js';

describe('Error handling and Exceptions', () => {
  test('Codes type validation...', () => {
    const i = new InventoryManager();
    let addResult = i.addProduct({
      code: null,
      name: 'Black',
      price: 86.82,
      discount: 9,
      amount: 116
    });

    expect(addResult.status).toBe(false);
    expect(addResult.message).toMatch('ERROR_DATA');

    addResult = i.addProduct({
      code: -1,
      name: 'Black',
      price: 86.82,
      discount: 9,
      amount: 116
    });

    expect(addResult.status).toBe(false);
    expect(addResult.message).toMatch('ERROR_DATA');

    addResult = i.addProduct({
      code: '122',
      name: 'Black',
      price: 86.82,
      discount: 9,
      amount: 116
    });

    expect(addResult.status).toBe(false);
    expect(addResult.message).toMatch('ERROR_DATA');

    addResult = i.addProduct({
      code: 22,
      name: 'Black',
      price: 86.82,
      discount: 9,
      amount: 116
    });

    expect(addResult.status).toBe(true);
  });

  test('Names type validation...', () => {
    const i = new InventoryManager();
    let addResult = i.addProduct({
      code: 111,
      name: undefined,
      price: 86.82,
      discount: 9,
      amount: 116
    });

    expect(addResult.status).toBe(false);
    expect(addResult.message).toMatch('ERROR_DATA');

    addResult = i.addProduct({
      code: 111,
      name: 12,
      price: 86.82,
      discount: 9,
      amount: 116
    });

    expect(addResult.status).toBe(false);
    expect(addResult.message).toMatch('ERROR_DATA');

    addResult = i.addProduct({
      code: 111,
      name: '',
      price: 86.82,
      discount: 9,
      amount: 116
    });

    expect(addResult.status).toBe(false);
    expect(addResult.message).toMatch('ERROR_DATA');

    addResult = i.addProduct({
      code: 111,
      name: 'Valid',
      price: 86.82,
      discount: 9,
      amount: 116
    });

    expect(addResult.status).toBe(true);
  });

  test('Prices type validation...', () => {
    const i = new InventoryManager();
    let addResult = i.addProduct({
      code: 111,
      name: 'Black',
      price: null,
      discount: 9,
      amount: 116
    });

    expect(addResult.status).toBe(false);
    expect(addResult.message).toMatch('ERROR_DATA');

    expect(addResult.status).toBe(false);
    expect(addResult.message).toMatch('ERROR_DATA');

    addResult = i.addProduct({
      code: 111,
      name: 'Black',
      price: 48.332,
      discount: 9,
      amount: 116
    });

    expect(addResult.status).toBe(false);
    expect(addResult.message).toMatch('ERROR_DATA');

    addResult = i.addProduct({
      code: 111,
      name: 'Black',
      price: -12.33,
      discount: 9,
      amount: 116
    });

    expect(addResult.status).toBe(false);
    expect(addResult.message).toMatch('ERROR_DATA');

    addResult = i.addProduct({
      code: 111,
      name: 'Black',
      price: 55.55,
      discount: 9,
      amount: 116
    });

    expect(addResult.status).toBe(true);
  });

  test('Discounts type validation...', () => {
    const i = new InventoryManager();
    let addResult = i.addProduct({
      code: 111,
      name: 'Black',
      price: 55.55,
      discount: null,
      amount: 116
    });

    expect(addResult.status).toBe(false);
    expect(addResult.message).toMatch('ERROR_DATA');

    addResult = i.addProduct({
      code: 111,
      name: 'Black',
      price: 55.55,
      discount: -2,
      amount: 116
    });

    expect(addResult.status).toBe(false);
    expect(addResult.message).toMatch('ERROR_DATA');

    addResult = i.addProduct({
      code: 111,
      name: 'Black',
      price: 55.55,
      discount: 8.12,
      amount: 116
    });

    expect(addResult.status).toBe(false);
    expect(addResult.message).toMatch('ERROR_DATA');

    addResult = i.addProduct({
      code: 111,
      name: 'Black',
      price: 55.55,
      discount: 3,
      amount: 116
    });

    expect(addResult.status).toBe(true);
  });

  test('Amounts type validation...', () => {
    const i = new InventoryManager();
    let addResult = i.addProduct({
      code: 111,
      name: 'Black',
      price: 55.55,
      discount: 9,
      amount: null
    });

    expect(addResult.status).toBe(false);
    expect(addResult.message).toMatch('ERROR_DATA');

    addResult = i.addProduct({
      code: 111,
      name: 'Black',
      price: 55.55,
      discount: 9,
      amount: -1
    });

    expect(addResult.status).toBe(false);
    expect(addResult.message).toMatch('ERROR_DATA');

    addResult = i.addProduct({
      code: 111,
      name: 'Black',
      price: 55.55,
      discount: 9,
      amount: 20
    });

    expect(addResult.status).toBe(true);
  });

  test('Duplicated product code...', () => {
    const i = new InventoryManager();
    const importResult = i.init([
      { code: 11, name: 'Black', price: 86.82, discount: 9, amount: 10 },
      { code: 11, name: 'Yellow', price: 65.77, discount: 0, amount: 40 },
      { code: 12, name: 'Orange', price: 55.55, discount: 0, amount: 90 },
      { code: 11, name: 'Purple', price: 95.84, discount: 10, amount: 90 },
      { code: 11, name: 'Red', price: 51.29, discount: 2, amount: 40 }
    ]);

    expect(importResult.length).toBe(3);
    expect(importResult[0]).toMatch('INVENTORY_CODE');
  });

  test('Duplicated product name...', () => {
    const i = new InventoryManager();
    const importResult = i.init([
      { code: 156, name: 'Yellow', price: 86.82, discount: 9, amount: 116 },
      { code: 2437, name: 'Yellow', price: 65.77, discount: 5, amount: 186 },
      { code: 122, name: 'Yellow', price: 95.84, discount: 10, amount: 99 }
    ]);

    expect(importResult.length).toBe(2);
    expect(importResult[0]).toMatch('INVENTORY_NAME');
  });

  test('Price validation...', () => {
    const i = new InventoryManager();
    const importResult = i.init([
      { code: 1, name: 'Black', price: 29.99, discount: 0, amount: 10 },
      { code: 2, name: 'Yellow', price: 49.99, discount: 5, amount: 10 },
      { code: 3, name: 'Red', price: 51.22, discount: 0, amount: 20 }
    ]);

    expect(importResult.length).toBe(2);
    expect(importResult[0]).toMatch('INVENTORY_PRICE');
  });

  test('Discount validation...', () => {
    const i = new InventoryManager();
    const importResult = i.init([
      { code: 1, name: 'Black', price: 55.55, discount: 0, amount: 10 },
      { code: 2, name: 'Yellow', price: 55.55, discount: 5, amount: 10 },
      { code: 3, name: 'Red', price: 55.55, discount: 12, amount: 20 }
    ]);

    expect(importResult.length).toBe(1);
    expect(importResult[0]).toMatch('INVENTORY_DISCOUNT');
  });

  test('Amount validation...', () => {
    const i = new InventoryManager();
    const importResult = i.init([
      { code: 1, name: 'Black', price: 55.55, discount: 0, amount: 0 },
      { code: 2, name: 'Yellow', price: 55.55, discount: 0, amount: 10 },
      { code: 3, name: 'Red', price: 55.55, discount: 0, amount: 5 }
    ]);

    expect(importResult.length).toBe(2);
    expect(importResult[0]).toMatch('INVENTORY_AMOUNT');
  });

  test('Single product addition...', () => {
    const i = new InventoryManager();
    const addResult = i.addProduct({
      code: 2,
      name: 'Red',
      price: 55.2,
      discount: 2,
      amount: 100
    });

    expect(addResult.status).toBe(true);
  });

  test('Mixed failed import validation...', () => {
    const i = new InventoryManager();
    const importResult = i.init([
      { code: 1, name: 'Black', price: 55.55, discount: 0, amount: 10 },
      { code: 1, name: 'Yellow', price: 55.55, discount: 0, amount: 10 },
      { code: 2, name: 'Red', price: 50.1, discount: 0, amount: 20 },
      { code: 3, name: 'Orange', price: 49.99, discount: 0, amount: 10 },
      { code: 4, name: 'Purple', price: 55.55, discount: 0, amount: 5 },
      { code: 5, name: 'Black', price: 55.55, discount: 0, amount: 10 }
    ]);

    // Added products
    expect(i.nProducts()).toBe(2);

    // Failed products
    // console.log(importResult);
    expect(importResult.length).toBe(4);
    expect(importResult[0]).toMatch('INVENTORY_CODE');
    expect(importResult[1]).toMatch('INVENTORY_PRICE');
    expect(importResult[2]).toMatch('INVENTORY_AMOUNT');
    expect(importResult[3]).toMatch('INVENTORY_NAME');
  });

  test('Successful import...', () => {
    const i = new InventoryManager();
    const importResult = i.init(INVENTORY);

    // Added products
    expect(i.nProducts()).toBe(20);
  });
});
