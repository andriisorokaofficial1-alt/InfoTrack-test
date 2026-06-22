import { defineStore } from 'pinia'
import type { Item, State } from '@/types/types';

export const useOrderStore = defineStore('order', {
  state: (): State => {
    return {
      order: [],
    }
  },

  getters: {
    itemsInOrderCount: (state) => {
      let itemsInOrder = 0;
      state.order.forEach(orderItem => itemsInOrder = itemsInOrder + orderItem.itemsInOrder);
      return itemsInOrder;
    },

    orderItems: (state) => {
      return state.order;
    }
  },

  actions: {
    addItemToOrder(item: Item) {
      if (this.order.length < 1) {
        this.order.push({...item, itemsInOrder: 1});
      } else {
        const isIteminOrder = this.order.some(orderItem => orderItem.id === item.id);
        if (!isIteminOrder) {
          this.order.push({...item, itemsInOrder: 1})
        } else {
          this.addToItemCount(item.id);
        }
      }
    },

    removeItemFromOrder(id: number) {
      this.order = this.order.filter(orderItem => orderItem.id !== id);
    },

    addToItemCount(id: number) {
       this.order = this.order.map(orderItem => {
        return { ...orderItem, itemsInOrder: id === orderItem.id ? orderItem.itemsInOrder + 1 : orderItem.itemsInOrder }
       });
    },

    minusToItemCount(id: number) {
      const orderItem = this.order.find(orderItem => orderItem.id === id);
      const itemsInOrder = orderItem!.itemsInOrder - 1;
      if (itemsInOrder < 1) {
        this.removeItemFromOrder(id);
      } else {
        this.order = this.order.map(orderItem => {
        return { ...orderItem, itemsInOrder: id === orderItem.id ? itemsInOrder : orderItem.itemsInOrder }
       });
      }
    },

    clearOrder() {
      this.order = [];
    }

  }
})
