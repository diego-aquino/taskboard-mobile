import React, { useCallback, useMemo, useRef, useState } from 'react';

import {
  ChevronLeftIcon,
  Logo,
  LogoutIcon,
  MenuIcon,
  PlusIcon,
  PreferencesIcon,
} from '~/assets';
import { LoadingScreen, Modal, Sidebar } from '~/components/common';
import { SortMethodForm } from '~/components/dashboardPage';
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

const DashboardPage = () => {
  const { logout } = useAuth();
  const { accountData } = useAccount();
  const { tasks, isLoading: isLoadingTasks, sortTasks } = useTasks();

  const sidebarRef = useRef(null);
  const [modalIsActive, setModalIsActive] = useState(false);
  const [shouldReverseSections, setShouldReverseSections] = useState(false);

  const openSidebar = useCallback(() => sidebarRef.current?.open(), []);
  const closeSidebar = useCallback(() => sidebarRef.current?.close(), []);

  const openModal = useCallback(() => setModalIsActive(true), []);
  const closeModal = useCallback(() => setModalIsActive(false), []);

  const handleSortMethodChange = useCallback(
    (criteria, order) => {
      if (criteria === 'completed') {
        setShouldReverseSections(order !== 'ascending');
      } else {
        sortTasks(criteria, order);
      }
    },
    [sortTasks],
  );

  const taskListSections = useMemo(() => {
    const sections = [
      { title: 'Para fazer', data: tasks.uncompleted },
      { title: 'Completas', data: tasks.completed },
    ];
    return shouldReverseSections ? sections.reverse() : sections;
  }, [tasks, shouldReverseSections]);

  if (!accountData || isLoadingTasks) {
    return <LoadingScreen />;
  }

  return (
    <Container>
      <StatusBar variant="light" />

      <Modal active={modalIsActive} onClose={closeModal}>
        <SortMethodForm
          initialSortingCriteria="completed"
          initialSortingOrder="ascending"
          onChange={handleSortMethodChange}
          onSubmit={closeModal}
        />
      </Modal>

      <Header>
        <HeaderButton onPress={openSidebar}>
          <MenuIcon />
        </HeaderButton>
        <HeaderButton onPress={openModal}>
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

      <AddTaskButton onPress={() => {}}>
        <PlusIcon />
      </AddTaskButton>
    </Container>
  );
};

export default DashboardPage;
