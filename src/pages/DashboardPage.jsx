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
import { LoadingScreen, Modal, Sidebar } from '~/components/common';
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
  } = useTasks();

  const sidebarRef = useRef(null);

  const openSidebar = useCallback(() => sidebarRef.current?.open(), []);
  const closeSidebar = useCallback(() => sidebarRef.current?.close(), []);

  const [taskListIsReady, setTaskListIsReady] = useState(false);
  const [shouldReverseSections, setShouldReverseSections] = useState(false);

  const [preferencesModalIsActive, setPreferencesModalIsActive] = useState(
    false,
  );
  const taskFormRef = useRef(null);
  const [taskFormModalIsActive, setTaskFormModalIsActive] = useState(false);

  const openSortingPreferencesModal = useCallback(() => {
    setPreferencesModalIsActive(true);
  }, []);

  const closeSortingPreferencesModal = useCallback(() => {
    setPreferencesModalIsActive(false);
  }, []);

  const openTaskFormModal = useCallback(() => {
    setTaskFormModalIsActive(true);
  }, []);

  const closeTaskFormModal = useCallback(() => {
    taskFormRef.current?.blurInput();
    setTaskFormModalIsActive(false);
    taskFormRef.current?.reset();
  }, []);

  const handleTaskCreation = useCallback(
    ({ name, priority }) => {
      closeTaskFormModal();
      createTask({ name, priority });
    },
    [closeTaskFormModal, createTask],
  );

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
      const preferences = await AsyncStorage.getItem(
        storageKeys.SORTING_PREFERENCES,
      );

      if (preferences) {
        const { criteria, orders } = JSON.parse(preferences);
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
      { title: 'Para fazer', data: tasks.uncompleted },
      { title: 'Completas', data: tasks.completed },
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
      >
        <SortingMethodForm
          initialCriteria={sortingCriteria}
          initialOrders={sortingOrders}
          onChange={applySortingPreferences}
          onSubmit={closeSortingPreferencesModal}
        />
      </Modal>

      <Modal active={taskFormModalIsActive} onClose={closeTaskFormModal}>
        <TaskForm ref={taskFormRef} onSubmit={handleTaskCreation} />
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
              spaced
            />
          )}
          renderSectionHeader={({ section }) => (
            <TaskSectionTitle>{section.title.toUpperCase()}</TaskSectionTitle>
          )}
          renderSectionFooter={() => <SpacingBetweenSections />}
        />
      </Main>

      <AddTaskButton onPress={openTaskFormModal}>
        <PlusIcon />
      </AddTaskButton>
    </Container>
  );
};

export default DashboardPage;
