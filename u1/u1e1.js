// T5. Técnicas para mejorar la estructura y robustez de código
// U1. Gestión de errores y excepciones
// Enunciado disponible en u1e1.md / Enunciat disponible a u1e1.md

// Escribe aquí tu solución / escriviu aquí la vostra solució:
export class InventoryManager {
  #productList = [];

  init(products) {
    const errors = [];
    products.forEach((product) => {
      const result = this.addProduct(product);
      if (!result.status) {
        errors.push(result.message);
      }
    });
    return errors.length === 0 ? true : errors;
  }

  nProducts() {
    return this.#productList.length;
  }

  addProduct(product) {
    let status = false;
    let message = '';
    try {
      this.validateProduct(product);
      this.#productList.push(product);
      status = true;
      message = `INVENTORY_ADD. El producto (${product.code}) ha sido añadido con éxito al inventario.`;
    } catch (error) {
      message = error.message;
    } finally {
      return { status, message };
    }
  }

  validateProduct(product) {
    const { code, name, price, discount, amount } = product;
    if (
      !Number.isInteger(code) ||
      code < 0 ||
      typeof name !== 'string' ||
      name.trim() === '' ||
      typeof price !== 'number' ||
      price <= 0 ||
      Number(price.toFixed(2)) !== price ||
      !Number.isInteger(discount) ||
      discount < 0 ||
      !Number.isInteger(amount) ||
      amount < 0
    ) {
      throw new Error(
        `ERROR_DATA. Alguno de los datos del producto (${code}) no tiene un formato válido.`
      );
    }
    if (this.#productList.some((p) => p.code === code)) {
      throw new Error(
        `INVENTORY_CODE. Ya existe otro producto con ese código (${code}).`
      );
    }
    if (this.#productList.some((p) => p.name === name)) {
      throw new Error(
        `INVENTORY_NAME. El nombre del producto (${code}) ya existe.`
      );
    }
    if (price < 50) {
      throw new Error(
        `INVENTORY_PRICE. El precio del producto (${code}) no puede ser inferior a 50.`
      );
    }
    if (discount > 10) {
      throw new Error(
        `INVENTORY_DISCOUNT. El descuento del producto (${code}) debe estar entre 0 y 10.`
      );
    }
    if (amount < 10) {
      throw new Error(
        `INVENTORY_AMOUNT. La cantidad de producto (${code}) no puede ser inferior a 10.`
      );
    }
    return true;
  }
}
