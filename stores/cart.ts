/* eslint-disable camelcase */
import { defineStore } from "pinia";
import type {
  Cart,
  CartAddress,
  CartItem,
  Checkout,
  CreditCardPayment,
  Payment,
  ShippingAddress,
  User,
  UserAddress,
} from "@/utils/types";
import {
  computed,
  ref,
  unref,
  useCookie,
  useFetch,
  useNuxtApp,
  type CreditCard,
} from "#imports";
import type { AddPixPaymentMehodResponse } from "~/types/cart";

export const useCartStore = defineStore("cart", () => {
  const affiliate = useCookie<string | null>("affiliate", {
    default: () => ref(null),
  });

  const coupon = useCookie<string>("coupon", {
    default: () => ref(""),
  });

  const cart = useCookie<Cart>("cart", {
    default: () =>
      ref({
        uuid: "",
        affiliate: null,
        coupon: null,
        discount: "",
        freight_product_code: "PAC",
        freight: {
          price: "",
          delivery_time: "",
        },
        zipcode: "",
        subtotal: "0",
        total: "0",
        cart_items: [],
      }),
  });

  const address = ref<CartAddress>({
    shipping_is_payment: false,
    user_address_id: null,
    shipping_address_id: null,
    user_address: {
      active: true,
      address_complement: "",
      address_id: null,
      city: "",
      country: "",
      neighborhood: "",
      state: "",
      street: "",
      street_number: "",
      user_id: null,
      zipcode: "",
    },
    shipping_address: {
      active: true,
      address_complement: "",
      address_id: null,
      city: "",
      country: "",
      neighborhood: "",
      state: "",
      street: "",
      street_number: "",
      user_id: null,
      zipcode: "",
    },
  });

  const user = ref<{ user_data: User }>({
    user_data: {
      user_id: null,
      name: "",
      email: "",
      phone: "",
      document: "",
    },
  });

  const paymentCreditCard = ref<CreditCard>({
    creditCardNumber: "",
    creditCardName: "",
    creditCardExpiration: "",
    creditCardCvv: "",
    installments: 1,
    installmentsMessage: "",
    typeDocument: "",
    document: "",
  });

  const payment = ref<Payment>({
    payment_method: "",
    payment_method_id: "",
    payment_intent: "",
    customer_id: "",
    card_token: null,
    pix_qr_code: "",
    pix_qr_code_base64: "",
    pix_payment_id: 0,
    gateway_provider: "",
    installments: 0,
    shipping_address_id: "",
    user_address_id: 0,
    shipping_is_payment: false,
    subtotal_with_fee: 0,
    total_with_fee: 0,
  });

  const loading = ref(false);
  const getCart = computed(() => cart.value);
  const { $config } = useNuxtApp();
  const serverUrl = $config.public.serverUrl;

  function setPaymentData(data: Payment) {
    payment.value = {
      ...payment.value,
      ...data
    }
  }


  function addToCart(item: CartItem) {
    if (!item) {
      return;
    }
    const uuid = cart.value.uuid;

    async function createCart() {
      try {
        const headers = {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        };
        if (!uuid) {
          const { data, error } = await useFetch(`${serverUrl}/cart/`, {
            method: "POST",
            headers,
          });

          if (unref(error)) {
            error.value = null;
            return;
          }
          const responseData = unref(data) as {
            uuid: string;
          };
          cart.value.uuid = responseData.uuid;
          return data;
        }

        return {
          data: {
            uuid,
          },
        };
      } catch (err) {
        console.error(err);
      }
    }

    async function addProduct(uuid: string = cart.value.uuid) {
      try {
        loading.value = true;
        const headers = {
          accept: "application/json",
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        };
        const { data, error } = await useFetch(
          `${serverUrl}/cart/${uuid}/product`,
          {
            method: "POST",
            headers,
            body: JSON.stringify({
              product_id: item.product_id,
              name: item.name,
              image_path: item.image_path,
              quantity: item.quantity,
              price: item.price,
              discount_price: 0,
            }),
          }
        );
        if (unref(error)) {
          error.value = null;
          return;
        }

        const responseData = unref(data) as Cart;

        setCart(unref(responseData));

        const responseEstimateData = await estimate();
        if (!responseEstimateData) {
          return;
        }
        setCart(responseEstimateData);
      } catch (err) {
        console.error(err);
      } finally {
        loading.value = false;
      }
    }

    createCart().then((data) => {
      const responseData = unref(data) as {
        uuid: string;
      };

      if (!responseData) {
        return;
      }

      addProduct(responseData.uuid);
    });
  }

  async function updateQuantity(id: number, quantity: number | null) {
    try {
      const product = cart.value.cart_items.find((p) => p.product_id === id);
      if (!product || !quantity) {
        return;
      }
      product.quantity = quantity;
      const responseData = await estimate();
      if (!responseData) {
        return;
      }
      setCart(responseData);
    } catch (err) {
      console.error(err);
    }
  }

  async function estimate() {
    try {
      loading.value = true;
      const headers = {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
      };

      const { data, error } = await useFetch(
        `/api/cart/${cart.value.uuid}/estimate`,
        {
          method: "POST",
          headers,
          body: {
            uuid: cart.value.uuid,
            cart_items: cart.value.cart_items,
            subtotal: cart.value.subtotal,
            total: cart.value.total,
            zipcode: cart.value.zipcode,
            freight_product_code: cart.value.freight_product_code,
            coupon: coupon.value,
            affiliate: affiliate.value,
          },
        }
      );

      if (unref(error)) {
        return unref(error)?.data.message;
      }

      const responseData = unref(data) as Cart;
      return responseData;
    } catch (err) {
      return err;
    } finally {
      loading.value = false;
    }
  }

  async function removeItem(id: number) {
    try {
      const cartItems = unref(cart).cart_items;
      cart.value.cart_items = cartItems.filter((p) => p.product_id !== id);
      if (cartItems.length === 1) {
        cart.value.uuid = "";
        return;
      }
      await estimate();
    } catch (err) {
      console.error(err);
    }
  }

  async function calculateFreight(zipcode: string, freightProductCode: string) {
    try {
      if (!zipcode) {
        return;
      }
      loading.value = true;
      cart.value.zipcode = zipcode;
      cart.value.freight_product_code = freightProductCode;

      const responseData = await estimate();
      if (!responseData) {
        return { error: "ERROR_CALCULATE_FREIGHT" };
      }

      if (responseData.uuid) {
        setCart(responseData);
      }
      return responseData;
    } catch (err) {
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  async function addCoupon(value: string) {
    try {
      if (!coupon) {
        return;
      }
      loading.value = true;
      coupon.value = value;
      const responseData = await estimate();
      if (!responseData) {
        return;
      }
      if (responseData.uuid) {
        setCart(responseData);
      }
      return responseData;
    } catch (err) {
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  async function getCartUser() {
    try {
      const uuid = cart.value.uuid;
      if (!uuid) {
        return;
      }

      const res = await fetch(`${serverUrl}/cart/${uuid}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${$config.public.apiKey}`,
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      const data = await res.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  }

  async function addUserCart() {
    try {
      const uuid = cart.value.uuid;
      if (!uuid) {
        return;
      }

      loading.value = true;
      const { data, error } = await useFetch(`/api/cart/${uuid}/user`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          ...cart.value,
          affiliate: affiliate.value,
          coupon: coupon.value,
        }),
      });

      if (unref(error)) {
        throw new Error("ERROR_ADD_USER_CART");
      }

      const responseData = unref(data) as {
        data: Cart & {
          user_data: User;
        };
        success: boolean;
      };

      if (!responseData.success) {
        throw new Error("ERROR_ADD_USER_CART");
      }
      const { user_data: userCart, ...restCart } = responseData.data;

      setUserCart(userCart);
      setCart(restCart);
      return data;
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  }

  async function addAddressCart(address: CartAddress) {
    try {
      const uuid = cart.value.uuid;

      if (!uuid) {
        return;
      }

      const { data, error } = await useFetch(`/api/cart/${uuid}/address`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: {
          cart: {
            ...cart.value,
            affiliate: affiliate.value,
            coupon: coupon.value,
            user_data: user.value.user_data,
          },
          address: {
            shipping_is_payment: address.shipping_is_payment,
            user_address: {
              ...address.user_address,
              user_id: user.value.user_data.user_id,
              address_id: null,
              active: true,
              address_complement: address.user_address.address_complement || "",
            },
            shipping_address: {
              ...address.shipping_address,
              user_id: user.value.user_data.user_id,
              address_id: null,
              active: true,
              address_complement:
                address.shipping_address?.address_complement || "",
            },
          },
        },
      });

      if (unref(error)) {
        error.value = null;
        throw new Error("ERROR_ADD_ADDRESS_CART"); // FIXME: show an error message
      }

      const responseData = unref(data) as {
        data: Cart & {
          user_data: User;
          user_address_id: number;
          shipping_address_id: number;
          shipping_is_payment: boolean;
        };
        success: boolean;
      };

      if (!responseData.success) {
        throw new Error("ERROR_ADD_ADDRESS_CART"); // FIXME: show an error message
      }

      const {
        shipping_is_payment: shippingIsPayment,
        shipping_address_id: shippingAddressId,
        user_address_id: userAddressId,
        ...restCart
      } = responseData.data;

      setShippingIsPayment(shippingIsPayment);
      setShippingAddress(address?.shipping_address ?? null);
      setUserAddress(address.user_address);
      setShippingAddressId(shippingAddressId);
      setUserAddressId(userAddressId);
      setCart(restCart);

      return data;
    } catch (err) {
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  async function addMercadoPagoCreditCardPayment(payment: CreditCardPayment) {
    try {
      const uuid = cart.value.uuid;
      if (!uuid) {
        return;
      }
      loading.value = true;
      const headers = {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      };

      const { data, error } = await useFetch(
        `/api/cart/${uuid}/payment/credit_card`,
        {
          method: "POST",
          headers,
          body: {
            cart: {
              ...cart.value,
              affiliate: affiliate.value,
              coupon: coupon.value,
              shipping_is_payment: address.value.shipping_is_payment,
              user_address_id: address.value.user_address_id,
              user_data: user.value.user_data,
            },
            payment,
          },
        }
      );

      if (unref(error) || !unref(data)) {
        throw new Error("ERROR_ADD_MERCADO_PAGO_CREDIT_CARD_PAYMENT"); // FIXME: show an error message
      }

      const responseData = unref(data) as {
        success: boolean;
        data: Checkout;
      };

      return unref(responseData);
    } catch (err) {
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  async function getCartPreview() {
    try {
      const uuid = cart.value.uuid;
      if (!uuid) {
        return;
      }

      const { data, error } = await useFetch(`api/cart/${uuid}/preview`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

      if (unref(error)) {
        error.value = null;
        return;
      }

      const responseData = unref(data) as {
        success: boolean;
        data: Checkout;
      };
      setCart(responseData.data);
      setUserAddressId(responseData.data.user_address_id);
      setShippingAddressId(responseData.data.shipping_address_id);
      setShippingIsPayment(responseData.data.shipping_is_payment);
      setPayment(responseData.data);
      return responseData;
    } catch (err) {
      console.error(err);
    }
  }

  async function finishCheckout() {
    try {
      const uuid = cart.value.uuid;
      if (!uuid) {
        return;
      }

      const headers = {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      };

      const { data, error } = await useFetch(`/api/cart/${uuid}/checkout`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          ...cart.value,
          ...user.value,
          ...payment.value,
          affiliate: affiliate.value,
          coupon: coupon.value,
          shipping_is_payment: address.value.shipping_is_payment,
          user_address_id: address.value.user_address_id,
          shipping_address_id: address.value.shipping_address_id,
        }),
      });

      if (unref(error)) {
        error.value = null;
        return;
      }

      const responseData = unref(data) as {
        status: string;
        message: string;
        order_id: string;
        gateway_payment_id: string;
      };
      return responseData;
    } catch (err) {
      console.error(err);
    }
  }

  function clearCart() {
    cart.value = {
      uuid: "",
      affiliate: null,
      coupon: null,
      discount: "",
      freight_product_code: "03298",
      freight: {
        price: "",
        delivery_time: "",
      },
      zipcode: "",
      subtotal: "0",
      total: "0",
      cart_items: [],
    };
  }

  async function getAddressByZipcode(zipcode: string, typeAddress: string) {
    try {
      loading.value = true;
      const { data, error } = await useFetch(
        `https://viacep.com.br/ws/${zipcode}/json/`
      );
      if (unref(error)) {
        error.value = null;
        return;
      }

      const responseData = unref(data) as {
        cep: string;
        logradouro: string;
        complemento: string;
        bairro: string;
        localidade: string;
        uf: string;
        ibge: string;
        gia: string;
        ddd: string;
        siafi: string;
      };

      address.value[typeAddress] = {
        country: "Brasil", // TODO: i18n
        state: responseData.uf,
        city: responseData.localidade,
        neighborhood: responseData.bairro,
        street: responseData.logradouro,
        street_number: "",
        address_complement: "",
        zipcode: responseData.cep,
      };

      return address.value[typeAddress];
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  }

  function setCart(userCart: Cart) {
    cart.value = userCart;
  }

  function setUserCart(userCart: User) {
    user.value.user_data = userCart;
  }

  function setUserAddress(userAddress: UserAddress) {
    address.value.user_address = userAddress;
  }

  function setShippingAddress(shippingAddress: ShippingAddress) {
    address.value.shipping_address = shippingAddress;
  }

  function setUserAddressId(userAddressId: number) {
    address.value.user_address_id = userAddressId;
  }

  function setShippingAddressId(shippingAddressId: number | null) {
    address.value.shipping_address_id = shippingAddressId;
  }

  function setShippingIsPayment(value: boolean) {
    address.value.shipping_is_payment = value;
  }

  function setPayment(paymentUser: Payment) {
    payment.value = paymentUser;
  }

  function setPaymentCreditCard(paymentCreditCardUser: CreditCard) {
    paymentCreditCard.value = paymentCreditCardUser;
  }

  function setAffiliate(value: string) {
    affiliate.value = value;
  }

  function clearAffiliate() {
    affiliate.value = null;
  }

  function clearFreight() {
    cart.value.freight = {
      delivery_time: "",
      price: "",
      max_date: "",
    };
  }

  function clearDiscount() {
    cart.value.discount = "0"
  }

  function setCoupon(value: string) {
    coupon.value = value
  }

  function getCartData() {
    return {
      ...cart.value,
      affiliate: affiliate.value,
      shipping_is_payment: address.value.shipping_is_payment,
      user_address_id: address.value.user_address_id,
      user_data: user.value.user_data,
    }
  }

  /**
   * Calls the API to add a new payment method (PIX)
   * @param paymentData: the relevant data about the payment method.
   */
  async function addPixPaymentMethod() {
    const headers = {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    const { data, error } = await useFetch<AddPixPaymentMehodResponse>(
      `/api/cart/${cart.value.uuid}/payment/pix`,
      {
        headers,
        method: 'POST',
        body: {
          cart: getCartData(),
          payment: {
            payment_gateway: 'MERCADOPAGO'
          }
        }
      }
    )

    if (unref(error) || !data.value || !data.value.success) {
      const errorMessage = unref(error)?.message ?? 'Request returned empty body.'
      throw new Error(errorMessage)
    }

    const { data: {
      shipping_is_payment,
      user_address_id,
      shipping_address_id,
      payment_method,
      payment_intent,
      customer_id,
      pix_qr_code,
      pix_qr_code_base64,
      pix_payment_id,
      gateway_provider,
      installments,
      total_with_fee,
      subtotal_with_fee,
      payment_method_id,
    } } = data.value

    setPaymentData({
      shipping_is_payment,
      user_address_id,
      shipping_address_id,
      payment_method,
      payment_method_id,
      payment_intent: payment_intent?.toString(),
      customer_id,
      pix_qr_code,
      pix_qr_code_base64,
      pix_payment_id: pix_payment_id ? parseInt(pix_payment_id) : 0,
      gateway_provider,
      installments,
      subtotal_with_fee: subtotal_with_fee ? parseInt(subtotal_with_fee) : 0,
      total_with_fee: total_with_fee ? parseInt(total_with_fee) : 0
    })

    return data.value.data
  }

  async function getPixPaymentStatus(paymentId: string) {
    const headers = {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    const { data, error } = await useFetch(
      '/api/cart/payment/status',
      {
        headers,
        method: 'POST',
        body: { paymentId },
      }
    )

    if (unref(error) || !data.value || !data.value.success) {
      const errorMessage = unref(error)?.message ?? 'Request returned empty body.'
      throw new Error(errorMessage)
    }

    return data.value.data
  }

  return {
    cart,
    address,
    getCart,
    loading,
    paymentCreditCard,
    coupon,
    payment,
    estimate,
    getCartUser,
    addToCart,
    updateQuantity,
    calculateFreight,
    removeItem,
    addUserCart,
    addAddressCart,
    addMercadoPagoCreditCardPayment,
    getCartPreview,
    getAddressByZipcode,
    setUserAddressId,
    setShippingAddressId,
    setShippingIsPayment,
    setPaymentCreditCard,
    finishCheckout,
    clearCart,
    clearAffiliate,
    setAffiliate,
    addCoupon,
    clearFreight,
    clearDiscount,
    setCoupon,
    setCart,
    addPixPaymentMethod,
    getPixPaymentStatus,
  };
});
