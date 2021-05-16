import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  ChevronLeftIcon,
  Logo,
  LogoutIcon,
  MenuIcon,
  PlusIcon,
  PreferencesIcon,
} from '~/assets';
import { LoadingScreen, Message, Modal, Sidebar } from '~/components/common';
import { SortingMethodForm, TaskForm } from '~/components/dashboardPage';
import { useAccount } from '~/contexts/AccountContext';
import { useAuth } from '~/contexts/AuthContext';
import { useTasks } from '~/hooks';
import { StatusBar } from '~/styles/global';
import {
  Container,
  Header,
  HeaderButton,
  Main,
  PageTitle,
  PageDescription,
  TaskSectionList,
  TaskSectionTitle,
  Task,
  EmptyTaskSectionText,
  SpacingBetweenSections,
  AddTaskButton,
  SidebarHeader,
  SidebarMain,
  UserName,
  LogoutButton,
  LogoutButtonText,
  LogoWrapper,
  CloseSidebarButton,
} from '~/styles/pages/DashboardPageStyles';
import { storageKeys } from '~/utils/local';

const saveSortingPreferencesLocally = async (criteria, orders) => {
  await AsyncStorage.setItem(
    storageKeys.SORTING_PREFERENCES,
    JSON.stringify({ criteria, orders }),
  );
};

const readLocalSortingPreferences = async () => {
  const preferences = await AsyncStorage.getItem(
    storageKeys.SORTING_PREFERENCES,
  );

  return preferences ? JSON.parse(preferences) : null;
};

const DashboardPage = () => {
  const { logout } = useAuth();
  const { accountData } = useAccount();
  const {
    tasks,
    isLoading: isLoadingTasks,
    sortingCriteria,
    setSortingCriteria,
    sortingOrders,
    setSortingOrders,
    createTask,
    editTask,
    removeTask,
  } = useTasks();

  const sidebarRef = useRef(null);

  const openSidebar = useCallback(() => sidebarRef.current?.open(), []);
  const closeSidebar = useCallback(() => sidebarRef.current?.close(), []);

  const [taskListIsReady, setTaskListIsReady] = useState(false);
  const [shouldReverseSections, setShouldReverseSections] = useState(false);

  const [preferencesModalIsActive, setPreferencesModalIsActive] = useState(
    false,
  );
  const [taskModalIsActive, setTaskModalIsActive] = useState(false);
  const [taskBeingEdited, setTaskBeingEdited] = useState(null);

  const lastTaskRemoved = useRef(null);
  const [messageText, setMessageText] = useState(null);

  const openSortingPreferencesModal = useCallback(() => {
    setPreferencesModalIsActive(true);
  }, []);

  const closeSortingPreferencesModal = useCallback(() => {
    setPreferencesModalIsActive(false);
  }, []);

  const openTaskCreationModal = useCallback(() => {
    setTaskBeingEdited(null);
    setTaskModalIsActive(true);
  }, []);

  const openTaskEditingModal = useCallback((taskToEdit) => {
    setTaskBeingEdited(taskToEdit);
    setTaskModalIsActive(true);
  }, []);

  const closeTaskModal = useCallback(() => {
    setTaskModalIsActive(false);
    setTaskBeingEdited(null);
  }, []);

  const handleTaskCreation = useCallback(
    ({ name, priority }) => {
      closeTaskModal();
      createTask({ name, priority });
    },
    [closeTaskModal, createTask],
  );

  const handleTaskEditing = useCallback(
    ({ id, name, priority, isChecked: isCompleted }) => {
      closeTaskModal();

      const taskId = taskBeingEdited?.id ?? id;

      const fieldsToUpdate = { name, priority, isCompleted };
      const nonUndefinedFieldsToUpdate = Object.keys(fieldsToUpdate).reduce(
        (accumulated, fieldName) =>
          fieldsToUpdate[fieldName] === undefined
            ? accumulated
            : { ...accumulated, [fieldName]: fieldsToUpdate[fieldName] },
        {},
      );

      editTask(taskId, nonUndefinedFieldsToUpdate);
      setTaskBeingEdited(null);
    },
    [closeTaskModal, editTask, taskBeingEdited],
  );

  const handleTaskRemoval = useCallback(() => {
    if (!taskBeingEdited) return;
    lastTaskRemoved.current = taskBeingEdited;
    removeTask(taskBeingEdited.id);

    setMessageText('Tarefa removida.');
    closeTaskModal();
  }, [closeTaskModal, removeTask, taskBeingEdited]);

  const hideMessage = useCallback(() => {
    setMessageText(null);
  }, []);

  const recreateLastRemovedTask = useCallback(() => {
    if (!lastTaskRemoved.current) return;
    createTask(lastTaskRemoved.current);
    hideMessage();
  }, [createTask, hideMessage]);

  const applySortingPreferences = useCallback(
    async (criteria, orders) => {
      if (criteria === 'completed') {
        const currentOrder = orders[criteria];
        setShouldReverseSections(currentOrder !== 'ascending');
      } else {
        setSortingCriteria(criteria);
      }

      setSortingOrders(orders);
      await saveSortingPreferencesLocally(criteria, orders);
    },
    [setSortingCriteria, setSortingOrders],
  );

  useEffect(() => {
    if (isLoadingTasks) return;

    const applyLocalSortingPreferences = async () => {
      const preferences = await readLocalSortingPreferences();

      if (preferences) {
        const { criteria, orders } = preferences;
        await applySortingPreferences(criteria, orders);

        if (criteria !== 'completed') {
          setShouldReverseSections(orders.completed !== 'ascending');
        }
      }

      setTaskListIsReady(true);
    };

    applyLocalSortingPreferences();
  }, [isLoadingTasks, applySortingPreferences]);

  const taskListSections = useMemo(() => {
    const sections = [
      { id: 'uncompleted', title: 'Para fazer', data: tasks.uncompleted },
      { id: 'completed', title: 'Completas', data: tasks.completed },
    ];
    return shouldReverseSections ? sections.reverse() : sections;
  }, [tasks, shouldReverseSections]);

  if (!accountData || isLoadingTasks || !taskListIsReady) {
    return <LoadingScreen />;
  }

  return (
    <Container>
      <StatusBar variant="light" />

      <Modal
        active={preferencesModalIsActive}
        onClose={closeSortingPreferencesModal}
        unmountChildrenWhenInactive={false}
      >
        <SortingMethodForm
          initialCriteria={sortingCriteria}
          initialOrders={sortingOrders}
          onChange={applySortingPreferences}
          onSubmit={closeSortingPreferencesModal}
        />
      </Modal>

      <Modal active={taskModalIsActive} onClose={closeTaskModal}>
        <TaskForm
          initialName={taskBeingEdited?.name ?? ''}
          initialPriority={taskBeingEdited?.priority ?? 'low'}
          submitButtonLabel={taskBeingEdited ? 'Editar tarefa' : 'Criar tarefa'}
          onSubmit={taskBeingEdited ? handleTaskEditing : handleTaskCreation}
          onRemoveTask={handleTaskRemoval}
          showRemoveButton={!!taskBeingEdited}
          autoFocusInput={!taskBeingEdited}
        />
      </Modal>

      <Header>
        <HeaderButton onPress={openSidebar}>
          <MenuIcon />
        </HeaderButton>
        <HeaderButton onPress={openSortingPreferencesModal}>
          <PreferencesIcon />
        </HeaderButton>
      </Header>

      <Sidebar ref={sidebarRef}>
        <SidebarHeader>
          <LogoWrapper>
            <Logo variant="secondary" />
          </LogoWrapper>
          <CloseSidebarButton onPress={closeSidebar}>
            <ChevronLeftIcon />
          </CloseSidebarButton>
        </SidebarHeader>

        <SidebarMain>
          <UserName>{accountData.firstName}</UserName>
          <UserName>{accountData.lastName}</UserName>
        </SidebarMain>

        <LogoutButton onPress={logout}>
          <LogoutIcon />
          <LogoutButtonText>Logout</LogoutButtonText>
        </LogoutButton>
      </Sidebar>

      <Main>
        <PageTitle>{`Suas tarefas, ${accountData.firstName}!`}</PageTitle>
        <PageDescription>
          Marque-as como concluídas, adicione novas ou edite as já existentes.
        </PageDescription>

        <TaskSectionList
          sections={taskListSections}
          keyExtractor={(task) => task.id}
          renderItem={({ item: task }) => (
            <Task
              id={task.id}
              name={task.name}
              priority={task.priority}
              checked={task.isCompleted}
              onTaskPress={openTaskEditingModal}
              onCheck={handleTaskEditing}
              spaced
            />
          )}
          renderSectionHeader={({ section }) => (
            <TaskSectionTitle>{section.title.toUpperCase()}</TaskSectionTitle>
          )}
          renderSectionFooter={({ section }) => (
            <>
              {section.data.length === 0 && (
                <EmptyTaskSectionText>
                  Sem tarefas{' '}
                  {section.id === 'completed' ? 'completas' : 'para fazer'}
                </EmptyTaskSectionText>
              )}
              <SpacingBetweenSections />
            </>
          )}
        />
      </Main>

      <AddTaskButton onPress={openTaskCreationModal}>
        <PlusIcon />
      </AddTaskButton>

      <Message
        text={messageText}
        actionButtonLabel="Desfazer"
        onActionButtonPress={recreateLastRemovedTask}
        closeAfterDelay={5000}
        onClose={hideMessage}
      />
    </Container>
  );
};

export default DashboardPage;
