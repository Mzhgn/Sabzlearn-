const showAllContacts = async () => {
  const contactsListTableEl = document.querySelector(".table tbody");
  contactsListTableEl.innerHTML = "";

  const res = await fetch(`http://127.0.0.1:4000/v1/contact`);
  const contacts = await res.json();

  contacts.forEach((contact, index) => {
    contactsListTableEl.insertAdjacentHTML(
      "beforeend",
      `
            <tr>
                <td class="${
                  contact.answer === 1 ? "answer-contact" : "no-answer-contact"
                }">${index + 1}</td>
                <td>${contact.name}</td>
                <td>${contact.email}</td>
                <td>${contact.phone}</td>
                <td>${contact.createdAt.slice(0, 10)}</td>
                <td>
                    <button type='button' onclick='showContactBody(${JSON.stringify(
                      contact.body
                    )})' class='btn btn-primary edit-btn'>مشاهده</button>
                </td>
                <td>
                    <button type='button' onclick='answerToContact(${JSON.stringify(
                      contact.email
                    )})' class='btn btn-primary edit-btn'>پاسخ</button>
                </td>
                <td>
                    <button type='button' onclick=removeContact('${
                      contact._id
                    }') class='btn btn-danger delete-btn'>حذف</button>
                </td>
            </tr>
        `
    );
  });
};

export { showAllContacts };
