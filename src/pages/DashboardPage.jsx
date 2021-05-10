import React, { useCallback, useRef } from 'react';

import {
  ChevronLeftIcon,
  Logo,
  LogoutIcon,
  MenuIcon,
  PlusIcon,
  PreferencesIcon,
} from '~/assets';
import { LoadingScreen, Sidebar } from '~/components/common';
import { useAccount } from '~/contexts/AccountContext';
import { useAuth } from '~/contexts/AuthContext';
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

const UNCOMPLETED_TASKS = [
  { id: 1, name: 'Task 1', isCompleted: false, priority: 'low' },
  { id: 2, name: 'Task 2', isCompleted: false, priority: 'high' },
  { id: 3, name: 'Task 3', isCompleted: false, priority: 'high' },
  { id: 4, name: 'Task 4', isCompleted: false, priority: 'low' },
];

const COMPLETED_TASKS = [
  { id: 5, name: 'Task 5', isCompleted: true, priority: 'high' },
  { id: 6, name: 'Task 6', isCompleted: true, priority: 'low' },
  { id: 7, name: 'Task 7', isCompleted: true, priority: 'low' },
  { id: 8, name: 'Task 8', isCompleted: true, priority: 'low' },
];

const DashboardPage = () => {
  const { logout } = useAuth();
  const { accountData } = useAccount();

  const sidebarRef = useRef(null);

  const openSidebar = useCallback(() => sidebarRef.current?.open(), []);
  const closeSidebar = useCallback(() => sidebarRef.current?.close(), []);

  if (!accountData) {
    return <LoadingScreen />;
  }

  return (
    <Container>
      <StatusBar variant="light" />

      <Header>
        <HeaderButton onPress={openSidebar}>
          <MenuIcon />
        </HeaderButton>
        <HeaderButton>
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
          sections={[
            { title: 'Para fazer', data: UNCOMPLETED_TASKS },
            { title: 'Completas', data: COMPLETED_TASKS },
          ]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Task
              id={item.id}
              name={item.name}
              priority={item.priority}
              checked={item.isCompleted}
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
