import { CompleteTransactionResponse } from './dto';
import { clientWithTokenApi } from '../instance';

/**
 * - 200 거래 성공
 * - 400 입력 값 오류
 * ```
 * {
 *  "message": "입력 값 오류"
 * }
 * ```
 * - 500 거래 완료 실패
 * ```
 * {
 * "message": "거래 완료 실패"
 * }
 * ```
 *
 */
export const completeTransaction = async ({ orderId }: { orderId: number }) => {
  const response = await clientWithTokenApi.post<CompleteTransactionResponse>(`/api/order/done/${orderId}`);

  return response.data;
};
