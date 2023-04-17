const cartDb = require('../../../data-access/cartDb');

const cartSchema = require('../../../validation/schema/cart');

const createValidation = require('../../../validation')(cartSchema.createSchema);
const updateValidation = require('../../../validation')(cartSchema.updateSchema);
const filterValidation = require('../../../validation')(cartSchema.filterValidationSchema);
const addCartUsecase = require('../../../use-case/cart/addCart')({
  cartDb,
  createValidation 
});
const findAllCartUsecase = require('../../../use-case/cart/findAllCart')({
  cartDb,
  filterValidation
});
const getCartCountUsecase = require('../../../use-case/cart/getCartCount')({
  cartDb,
  filterValidation
});
const getCartUsecase = require('../../../use-case/cart/getCart')({
  cartDb,
  filterValidation
});
const updateCartUsecase = require('../../../use-case/cart/updateCart')({
  cartDb,
  updateValidation 
});
const partialUpdateCartUsecase = require('../../../use-case/cart/partialUpdateCart')({ cartDb });
const softDeleteCartUsecase = require('../../../use-case/cart/softDeleteCart')({ cartDb });
const softDeleteManyCartUsecase = require('../../../use-case/cart/softDeleteManyCart')({ cartDb });
const bulkInsertCartUsecase = require('../../../use-case/cart/bulkInsertCart')({ cartDb });
const bulkUpdateCartUsecase = require('../../../use-case/cart/bulkUpdateCart')({ cartDb });
const deleteCartUsecase = require('../../../use-case/cart/deleteCart')({ cartDb });
const deleteManyCartUsecase = require('../../../use-case/cart/deleteManyCart')({ cartDb });

const cartController = require('./cart');

const addCart = cartController.addCart(addCartUsecase);
const findAllCart = cartController.findAllCart(findAllCartUsecase);
const getCartCount = cartController.getCartCount(getCartCountUsecase);
const getCartById = cartController.getCart(getCartUsecase);
const updateCart = cartController.updateCart(updateCartUsecase);
const partialUpdateCart = cartController.partialUpdateCart(partialUpdateCartUsecase);
const softDeleteCart = cartController.softDeleteCart(softDeleteCartUsecase);
const softDeleteManyCart = cartController.softDeleteManyCart(softDeleteManyCartUsecase);
const bulkInsertCart = cartController.bulkInsertCart(bulkInsertCartUsecase);
const bulkUpdateCart = cartController.bulkUpdateCart(bulkUpdateCartUsecase);
const deleteCart = cartController.deleteCart(deleteCartUsecase);
const deleteManyCart = cartController.deleteManyCart(deleteManyCartUsecase);

module.exports = {
  addCart,
  findAllCart,
  getCartCount,
  getCartById,
  updateCart,
  partialUpdateCart,
  softDeleteCart,
  softDeleteManyCart,
  bulkInsertCart,
  bulkUpdateCart,
  deleteCart,
  deleteManyCart,
};