import {
  Divider,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Stack,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";

function InvestmentCalculator() {
  const [received, setReceived] = useState(0);
  const [installments, setInstallments] = useState(0);
  const [amount, setAmount] = useState(0);
  const [mensualInflationAprox, setMensualInflationAprox] = useState(0);

  const total = installments * amount;

  const interestPercent = (total / received - 1) * 100;
  const interestPerMonth = ((total / received) ** (1 / installments) - 1) * 100;

  const mensualReturnNecessary =
    (mensualInflationAprox + interestPerMonth) / 100;
  const returnNecessary =
    ((mensualReturnNecessary + 1) ** installments - 1) * 100;
  const anualReturnNecessary =
    ((returnNecessary / 100 + 1) ** (1 / (installments / 12)) - 1) * 100;

  const shouldShowResults = [
    received,
    installments,
    amount,
    mensualInflationAprox,
  ].every((value) => value > 0);

  return (
    <>
      <Head>
        <title>Calculadora para préstamos de padre</title>
      </Head>
      <Stack gap={6} maxW="80" margin="auto" py={6} px={4}>
        <Stack gap={2}>
          <Text fontSize="lg" fontWeight={600}>
            Calculadora
          </Text>

          <label>
            Monto recibido:
            <InputGroup>
              <InputLeftAddon>$</InputLeftAddon>
              <Input
                type="number"
                value={received}
                onChange={(event) =>
                  setReceived(parseFloat(event.target.value))
                }
              />
            </InputGroup>
          </label>

          <label>
            Numero de cuotas:
            <Input
              type="number"
              value={installments}
              onChange={(event) =>
                setInstallments(parseInt(event.target.value))
              }
            />
          </label>

          <label>
            Monto de cada cuota:
            <InputGroup>
              <InputLeftAddon>$</InputLeftAddon>
              <Input
                type="number"
                value={amount}
                onChange={(event) => setAmount(parseFloat(event.target.value))}
              />
            </InputGroup>
            <Text fontSize="xs">Ingresar promedio si la cuota no es fija</Text>
          </label>

          <label>
            Inflacion mensual aproximada:
            <InputGroup>
              <Input
                type="number"
                value={mensualInflationAprox}
                onChange={(event) =>
                  setMensualInflationAprox(parseFloat(event.target.value))
                }
              />
              <InputRightAddon>%</InputRightAddon>
            </InputGroup>
          </label>
        </Stack>

        <Divider />

        {shouldShowResults && (
          <Stack gap={1}>
            <Text>Total a pagar: {total}</Text>
            <Text>Porcentaje de interes: {interestPercent}%</Text>

            <Text>Interes por mes: {interestPerMonth.toFixed(2)}%</Text>

            <Text>
              Para mantener el mismo poder adquisitivo de {received} pagando las
              cuotas, debe conseguir una inversión que mensualmente de un{" "}
              {(mensualReturnNecessary * 100).toFixed(2)}% de ganancia.
            </Text>

            <Text>
              Lo cual es un total de {returnNecessary.toFixed(2)}% y anualmente{" "}
              {anualReturnNecessary.toFixed(2)}%.
            </Text>
          </Stack>
        )}

        <Divider />

        <Stack gap={2}>
          <Text fontSize="lg" fontWeight={600}>
            Referencias anuales en pesos
          </Text>

          <Text>
            <Text as="span" color="green.400" fontWeight={600}>
              ~60-80%
            </Text>{" "}
            puede llegar con plazo fijo
          </Text>
          <Text>
            <Text as="span" color="green.200" fontWeight={600}>
              ~80-85%
            </Text>{" "}
            puede llegar con inversiones conservadoras
          </Text>
          <Text>
            <Text as="span" fontWeight={600} color="orange.300">
              ~90-100%
            </Text>{" "}
            puede llegar con inversiones moderadas
          </Text>
          <Text>
            <Text as="span" fontWeight={600} color="red.400">
              ~100++%
            </Text>{" "}
            puede llegar con inversiones agresivas
          </Text>
        </Stack>
      </Stack>
    </>
  );
}

export default InvestmentCalculator;
