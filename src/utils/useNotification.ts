import { useCallback, useMemo } from "react";
import { notification } from "antd";

const useNotification = (message: string) => {
  const [api, contextHolder] = notification.useNotification();

  const notify = useCallback((message: string) => {
    api.info({
      message: `This is ${message}`,
      description: `Test description`,
      placement: "topRight",
    });
  }, []);

  const contextValue = useMemo(() => ({ messge: '' }), []);

  
}