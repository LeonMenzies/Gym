import useFetchApi from './useFetchApi';
import usePostApi from './usePostApi';
import { OnboardingData } from '~utils/OnboardingProvider';

export const useOnboardingData = () => {
  const [fetchResponse, fetchLoading, fetchData] = useFetchApi<OnboardingData>('/api/user/info');
  const [updateResponse, updateLoading, updateData] = usePostApi<Partial<OnboardingData>, OnboardingData>('/api/user/info');

  return {
    fetchData,
    updateData,
    loading: fetchLoading || updateLoading,
    data: fetchResponse.data,
    error: !fetchResponse.success ? fetchResponse.message : null
  };
};