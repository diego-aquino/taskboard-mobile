import React, { useCallback, useEffect, useMemo, useState } from 'react';

import {
  Button,
  SwitchButton,
  SingleChoiceCheckboxesInput,
} from '~/components/common';
import {
  Container,
  Title,
  ChevronIcon,
} from '~/styles/components/dashboardPage/SortingMethodFormStyles';

const SORTING_CRITERIA_OPTIONS = [
  { label: 'Prioridade', value: 'priority' },
  { label: 'Nome', value: 'name' },
  { label: 'Completas', value: 'completed' },
];

const CHECKBOX_LABELS = {
  priority: { ascending: 'Baixa - Alta', descending: 'Alta - Baixa' },
  name: { ascending: 'A - Z', descending: 'Z - A' },
  completed: {
    ascending: 'Para fazer - Completas',
    descending: 'Completas - Para fazer',
  },
};

const SortingMethodForm = ({
  initialCriteria,
  initialOrders,
  onChange,
  onSubmit,
}) => {
  const [sortingCriteria, setSortingCriteria] = useState(initialCriteria);
  const [sortingOrders, setSortingOrders] = useState(initialOrders);

  const handleSortingOrderChange = useCallback(
    (newOrder) => {
      setSortingOrders((currentOrders) => ({
        ...currentOrders,
        [sortingCriteria]: newOrder,
      }));
    },
    [sortingCriteria],
  );

  useEffect(() => {
    onChange?.(sortingCriteria, sortingOrders);
  }, [onChange, sortingCriteria, sortingOrders]);

  const handleSubmit = useCallback(() => {
    onSubmit?.(sortingCriteria, sortingOrders);
  }, [onSubmit, sortingCriteria, sortingOrders]);

  const sortingOrderOptions = useMemo(
    () => [
      {
        value: 'ascending',
        icon: <ChevronIcon direction="up" />,
        label: CHECKBOX_LABELS[sortingCriteria].ascending,
      },
      {
        value: 'descending',
        icon: <ChevronIcon direction="down" />,
        label: CHECKBOX_LABELS[sortingCriteria].descending,
      },
    ],
    [sortingCriteria],
  );

  return (
    <Container>
      <Title>Ordenar suas tarefas por</Title>

      <SwitchButton
        value={sortingCriteria}
        options={SORTING_CRITERIA_OPTIONS}
        onChange={setSortingCriteria}
      />

      <SingleChoiceCheckboxesInput
        value={sortingOrders[sortingCriteria]}
        options={sortingOrderOptions}
        onChange={handleSortingOrderChange}
      />

      <Button label="Confirmar" onPress={handleSubmit} />
    </Container>
  );
};

export default SortingMethodForm;
