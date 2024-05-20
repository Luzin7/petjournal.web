'use client';
import petJournalLogo from '@/assets/svg/petJournalIcon.svg';
import Image from 'next/image';
import { useRef, useState } from 'react';
import clsx from 'clsx';

function RecoveryCode() {
  const [inputValues, setInputValues] = useState(Array(6).fill(''));
  const [verificationStatus, setVerificationStatus] = useState<
    'valid' | 'invalid' | 'none'
  >('none');
  const inputRefs = useRef<HTMLInputElement[] | null[]>([]);

  function handleInputChange(index: number, value: string) {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);

    if (value && index < inputRefs.current.length - 1) {
      (inputRefs.current[index + 1] as HTMLInputElement).focus();
    }
  }

  function isButtonDisabled() {
    return inputValues.some((value) => value === '');
  }

  function validateCode(code: string[]): boolean {
    // temp code
    const validCode = ['1', '2', '3', '4', '5', '6'];
    return code.every((value, index) => value === validCode[index]);
  }

  function handleSubmit() {
    if (validateCode(inputValues)) {
      setVerificationStatus('valid');
      //redirect to 'change password'
    } else {
      setVerificationStatus('invalid');
    }
  }

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Image src={petJournalLogo} alt="petJournalLogo" />
        <div className="text-[22px] font-bold">
          <h2 className="text-center">Acabamos de enviar um código</h2>
          <h2 className="text-center">para seu e-mail</h2>
        </div>
        <p className="mt-8 text-[15px]">
          Insira no campo abaixo o código de verificação de 6
        </p>
        <p className="text-[15px]">dígitos enviado para o seu email.</p>
        {verificationStatus === 'invalid' && (
          <p className="text-red-600 mt-4">
            O código de verificação que você inseriu não é válido. Verifique o
            código e tente novamente
          </p>
        )}
        <div className="flex space-x-2 mt-2">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                pattern="\d*"
                value={inputValues[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyPress={(e) => {
                  if (!/\d/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                className={clsx(
                  'w-12 h-16 text-center border-2 rounded-md mt-8',
                  inputValues[index]
                    ? 'border-custom-purple focus:ring-4 focus:ring-custom-purple focus:border-transparent focus:outline-none'
                    : 'border-gray-300 focus:ring-4 focus:ring-custom-purple focus:border-transparent focus:outline-none',
                )}
              />
            ))}
        </div>
        <button
          disabled={isButtonDisabled()}
          onClick={handleSubmit}
          className={clsx(
            'mt-8 font-bold py-4 px-24 rounded-full',
            isButtonDisabled()
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-custom-purple hover:bg-custom-purple-hover text-white',
          )}
        >
          Enviar
        </button>
        <p className="mt-8 text-[15px]">
          Dica: Caso não encontre o e-mail na sua caixa de
        </p>
        <p className="text-[15px]">entrada. Verifique a pasta de Spam!</p>
      </div>
    </>
  );
}

export default RecoveryCode;