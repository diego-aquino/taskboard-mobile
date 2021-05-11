import React, { useCallback, useEffect, useState } from 'react';

import { ChevronUpIcon } from '~/assets';
import { Button, Checkbox, SwitchButton } from '~/components/common';
import {
  CheckboxOption,
  CheckboxOptionLabel,
  ChevronDownIcon,
  Container,
  SortingOrderContainer,
  Title,
} from '~/styles/components/dashboardPage/SortMethodForm';

const sortingCriteriaOptions = [
  { label: 'Prioridade', name: 'priority' },
  { label: 'Nome', name: 'name' },
  { label: 'Completas', name: 'completed' },
];

const checkboxLabels = {
  priority: { ascending: 'Baixa - Alta', descending: 'Alta - Baixa' },
  name: { ascending: 'A - Z', descending: 'Z - A' },
  completed: {
    ascending: 'Para fazer - Completas',
    descending: 'Completas - Para fazer',
  },
};

const SortMethodForm = ({
  initialSortingCriteria,
  initialSortingOrder,
  onChange,
  onSubmit,
}) => {
  const [sortingCriteria, setSortingCriteria] = useState(
    initialSortingCriteria,
  );
  const [sortingOrders, setSortingOrders] = useState({
    priority: initialSortingOrder,
    name: initialSortingOrder,
    completed: initialSortingOrder,
  });

  const selectAscendingOrder = useCallback(() => {
    setSortingOrders((currentOrders) => ({
      ...currentOrders,
      [sortingCriteria]: 'ascending',
    }));
  }, [sortingCriteria]);

  const selectDescendingOrder = useCallback(() => {
    setSortingOrders((currentOrders) => ({
      ...currentOrders,
      [sortingCriteria]: 'descending',
    }));
  }, [sortingCriteria]);

  useEffect(() => {
    onChange?.(sortingCriteria, sortingOrders[sortingCriteria]);
  }, [onChange, sortingCriteria, sortingOrders]);

  const handleSubmit = useCallback(() => {
    onSubmit?.(sortingCriteria, sortingOrders[sortingCriteria]);
  }, [onSubmit, sortingCriteria, sortingOrders]);

  return (
    <Container>
      <Title>Ordenar suas tarefas por</Title>

      <SwitchButton
        options={sortingCriteriaOptions}
        selectedOptionName={sortingCriteria}
        onChange={setSortingCriteria}
      />

      <SortingOrderContainer>
        <CheckboxOption
          onPress={selectAscendingOrder}
          disabled={sortingOrders[sortingCriteria] === 'ascending'}
        >
          <ChevronUpIcon />
          <CheckboxOptionLabel>
            {checkboxLabels[sortingCriteria].ascending}
          </CheckboxOptionLabel>
          <Checkbox
            checked={sortingOrders[sortingCriteria] === 'ascending'}
            onCheckChange={selectAscendingOrder}
            disabled={sortingOrders[sortingCriteria] === 'ascending'}
          />
        </CheckboxOption>

        <CheckboxOption
          onPress={selectDescendingOrder}
          disabled={sortingOrders[sortingCriteria] === 'descending'}
          spaced
        >
          <ChevronDownIcon />
          <CheckboxOptionLabel>
            {checkboxLabels[sortingCriteria].descending}
          </CheckboxOptionLabel>
          <Checkbox
            checked={sortingOrders[sortingCriteria] === 'descending'}
            onCheckChange={selectDescendingOrder}
            disabled={sortingOrders[sortingCriteria] === 'descending'}
          />
        </CheckboxOption>
      </SortingOrderContainer>

      <Button label="Confirmar" onPress={handleSubmit} />
    </Container>
  );
};

export default SortMethodForm;
