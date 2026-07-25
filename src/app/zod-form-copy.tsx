import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const SignUpParams = z.object({
  mailAddress: z.string().email('正しいメールアドレスを入力してください'),
  pass: z.string().min(8, 'パスワードは8文字以上必要です'),
})

type SignUpInput = z.infer<typeof SignUpParams>
const a = zodResolver(SignUpParams)
export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors: e },
  } = useForm<SignUpInput>({
    resolver: zodResolver(SignUpParams)
  })

  const onSubmit = (data: SignUpInput) => {
    console.log()
  }

  const mailAddress = watch('mailAddress')
  const sample = mailAddress
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>
        入力してください {mailAddress}
      </p>
      <input type="email" {...register('mailAddress')} />
      <input type="password"{...register('pass')} />

      <button type="submit">

      </button>
      {mailAddress && (
        <>
          <p>メールアドレスが入力されています</p>
          <p>{mailAddress}</p>
        </>
      )}

      {e.mailAddress && (
        <>
          メールアドレスの入力でエラーがあります
          {e.mailAddress.message}
        </>
      )}

      {e.pass && (
        <>
          パスワードの入力でエラーがあります
          {e.pass.message}
        </>
      )}
    </form>
  )
}

