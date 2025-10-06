export interface INavbarData {
  menuId?: number;
  route: string;
  icon: string;
  label: string;
  expanded?: boolean;
  items?: INavbarData[];
  isNew?: boolean;  
  favorite?: boolean;
}

