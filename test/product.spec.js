import { shallowMount } from '@vue/test-utils'
import product from '~/components/product'

const factory = () => {
  return shallowMount(product, {
    propsData: {
      product: {
        name: '',
        price: 0,
        desc: '',
        imageUrl: '',
      }
    }
  });
};

describe("Product", () => {
  test("mounts properly", () => {
    const wrapper = factory();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test("renders properly", () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
