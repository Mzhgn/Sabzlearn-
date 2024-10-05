import { getToken, showSwal } from "../../funcs/utils.js";

const setCampaign = async () => {
  const campaingPercentInputEl = document.querySelector(
    "#campaign-percent-input"
  );

  const newCampaignInfo = {
    discount: campaingPercentInputEl.value.trim(),
  };

  const res = await fetch(`http://127.0.0.1:4000/v1/offs/all`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(newCampaignInfo),
  });

  if (res.ok) {
    showSwal(
      "کمپین جدید با موفقیت تنظیم شد",
      "success",
      "خیلی هم عالی",
      () => {}
    );
  }
};
export { setCampaign };
