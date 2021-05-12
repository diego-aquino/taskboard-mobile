import styled from 'styled-components/native';

import { Task as BaseTask } from '~/components/dashboardPage';
import variables from '~/styles/variables';

export const Container = styled.View`
  padding: 24px 24px 0;
  flex: 1;
  background-color: ${variables.colors.white};
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const HeaderButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.4,
})``;

export const SidebarHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const LogoWrapper = styled.View`
  width: 120px;
  height: 30px;
`;

export const CloseSidebarButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.4,
})``;

export const SidebarMain = styled.View`
  margin-top: 64px;
  flex: 1;
`;

export const UserName = styled.Text`
  font-size: 36px;
  font-family: ${variables.fonts.bold};
  color: ${variables.colors.white};
`;

export const LogoutButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.4,
})`
  flex-direction: row;
  align-items: center;
`;

export const LogoutButtonText = styled.Text`
  margin-left: 12px;
  color: ${variables.colors.lightBlue};
  font-size: 18px;
`;

export const Main = styled.View`
  margin-top: 32px;
  flex: 1;
`;

export const PageTitle = styled.Text`
  color: ${variables.colors.darkBlue};
  font-size: 32px;
  font-family: ${variables.fonts.bold};
`;

export const PageDescription = styled.Text`
  margin-top: 18px;

  color: ${variables.colors.lightBlue};
  font-size: 16px;
`;

export const TaskSectionList = styled.SectionList`
  margin-top: 42px;
`;

export const TaskSectionTitle = styled.Text`
  margin-bottom: 12px;

  font-size: 12px;
  color: ${variables.colors.lightBlue};
`;

export const Task = styled(BaseTask)`
  margin-bottom: ${({ spaced }) => (spaced ? '8px' : 0)};
`;

export const SpacingBetweenSections = styled.View`
  margin-bottom: 24px;
`;

export const AddTaskButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  position: absolute;
  bottom: 18px;
  right: 18px;

  padding: 14px;
  border-radius: 50px;
  background-color: ${variables.colors.brightBlue};
`;
