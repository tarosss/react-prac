
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// 💡 1. フォームの入力ルールと型を同時に定義！
const SignUpSchema = z.object({
  email: z.string().email('正しいメールアドレスを入力してください'),
  password: z.string().min(8, 'パスワードは8文字以上必要です'),
});

// スキーマから型を自動抽出
type SignUpInput = z.infer<typeof SignUpSchema>;
export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInput>({
    // 💡 2. Zodのルールを React Hook Form に渡す
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = (data: SignUpInput) => {
    // ここに来るデータは確実に「8文字以上のパスワード」かつ「正しいメアド」であることが保証されている！
    console.log('送信データ:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} placeholder="メールアドレス" />
      {errors.email && <p>{errors.email.message}</p>}

      <input {...register('password')} type="password" placeholder="パスワード" />
      {errors.password && <p>{errors.password.message}</p>}

      <button type="submit">登録</button>
    </form>
  );
}