import { FC } from "react";
import { User } from "~/types";
import { formatTimeAgo } from "~/utils/format-time";

interface UserInfoProps {
  user: User;
}

export const UserInfo: FC<UserInfoProps> = ({ user }) => {
  return (
    <div className="w-full bg-neutral-300 dark:bg-neutral-800 sm:rounded-md p-2">
      <p className="font-bold">{user.id}</p>
      <p>karma: {user.karma}</p>
      <p>joined {formatTimeAgo(user.created)}</p>
    </div>
  );
};
