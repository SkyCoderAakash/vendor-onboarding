import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  cacheCompanyTypes,
  cacheCountries,
  cacheCurrencies,
  cacheServices,
  cachePricingModels,
} from "../store/slices/formSlice";
import { apiService } from "../services/api.service";

const useCachedData = <T>(
  selector: (state: any) => T[],
  cacheAction: (data: T[]) => any,
  fetchFunction: () => Promise<T[]>,
  errorMessage: string,
) => {
  const dispatch = useAppDispatch();
  const cachedData = useAppSelector(selector);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (cachedData && cachedData.length > 0) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await fetchFunction();
        dispatch(cacheAction(data));
      } catch (err) {
        setError(errorMessage);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [cachedData, dispatch, cacheAction, fetchFunction, errorMessage]);

  return { data: cachedData || [], loading, error };
};

export const useCachedCompanyTypes = () => {
  return useCachedData(
    (state) => state.form.cachedCompanyTypes,
    cacheCompanyTypes,
    () => apiService.getCompanyTypes(),
    "Failed to load company types",
  );
};

export const useCachedCountries = () => {
  return useCachedData(
    (state) => state.form.cachedCountries,
    cacheCountries,
    () => apiService.getCountries(),
    "Failed to load countries",
  );
};

export const useCachedCurrencies = () => {
  return useCachedData(
    (state) => state.form.cachedCurrencies,
    cacheCurrencies,
    () => apiService.getCurrencies(),
    "Failed to load currencies",
  );
};

export const useCachedServices = () => {
  return useCachedData(
    (state) => state.form.cachedServices,
    cacheServices,
    () => apiService.getServices(),
    "Failed to load services",
  );
};

export const useCachedPricingModels = () => {
  return useCachedData(
    (state) => state.form.cachedPricingModels,
    cachePricingModels,
    () => apiService.getPricingModels(),
    "Failed to load pricing models",
  );
};
