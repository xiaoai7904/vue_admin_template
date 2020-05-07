import HistoryRecord from '@/module/historyRecord/HistoryRecord.module';
import store from '@/store/store';

export const historyRecord = new HistoryRecord({isUpdateLastData: false, sing: true});

export const add = newValue => {
  store.commit('setOpenRouterStack', historyRecord.pushStack({ name: newValue.name, path: newValue.path }, 'path').historyStack);
};

export const del = (newValue) => {
    store.commit('setOpenRouterStack', historyRecord.clearStack(newValue.path, 'path').historyStack);
};
