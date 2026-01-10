export const electronPathsAPI = async (): Promise<void> => {
  const path = await import('path');
  const { contextBridge, ipcRenderer } = await import('electron');

  contextBridge.exposeInMainWorld('electronPathsAPI', {
    app: async () => {
      return await ipcRenderer.invoke('get-path', 'assets');
    },

    cache: async () => {
      const userData = await ipcRenderer.invoke('get-path', 'userData');
      return path.join(userData, 'cache');
    },

    data: async () => {
      const userData = await ipcRenderer.invoke('get-path', 'userData');
      return path.join(userData, 'data');
    },

    documents: async () => {
      return await ipcRenderer.invoke('get-path', 'documents');
    },

    home: async () => {
      return await ipcRenderer.invoke('get-path', 'home');
    },
  });
};
