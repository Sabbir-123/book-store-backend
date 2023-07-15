import { User } from "./user.model";

export const findLastUserId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastUser?.id;
};

export const generateUseId = async (role: string) => {
  const lastSellerId = await User.findOne({ role: "seller" }, { id: 1 })
    .sort({ id: -1 })
    .lean();
  const lastBuyerId = await User.findOne({ role: "buyer" }, { id: 1 })
    .sort({ id: -1 })
    .lean();

  let prefix = "";
  let currentId = 0;

  if (role === "buyer") {
    prefix = "B";
    currentId = lastBuyerId ? parseInt(lastBuyerId.id.slice(1)) : 0;
  } else if (role === "seller") {
    prefix = "S";
    currentId = lastSellerId ? parseInt(lastSellerId.id.slice(1)) : 0;
  } else {
    throw new Error("Invalid user role");
  }

  const incrementedId = (currentId + 1).toString().padStart(4, "0");
  const generatedId = `${prefix}${incrementedId}`;

  return generatedId;
};
