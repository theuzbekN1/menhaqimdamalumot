const form = document.getElementById("studentForm");

const resultBox = document.getElementById("resultBox");

const cardContainer = document.getElementById("cardContainer");

const downloadBtn = document.getElementById("downloadBtn");

const againBtn = document.getElementById("againBtn");


let studentData = null;

let selectedPhoto = null;


/* RANDOM DIZAYN */

function randomDesign() {

    const designs = [

        "design-1",
        "design-2",
        "design-3",
        "design-4",
        "design-5",
        "design-6",
        "design-7",
        "design-8"

    ];

    return designs[
        Math.floor(
            Math.random() * designs.length
        )
    ];
}


/* MA'LUMOTLARNI OLISH */

function getData() {

    return {

        firstName:
            document.getElementById("firstName").value.trim(),

        lastName:
            document.getElementById("lastName").value.trim(),

        school:
            document.getElementById("school").value.trim(),

        className:
            document.getElementById("className").value.trim(),

        birthDate:
            document.getElementById("birthDate").value,

        subject:
            document.getElementById("subject").value.trim(),

        hobby:
            document.getElementById("hobby").value.trim(),

        about:
            document.getElementById("about").value.trim()

    };

}


/* KARTA YARATISH */

function createCard(data) {

    const design = randomDesign();


    const card = document.createElement("div");

    card.className =
        `student-card ${design}`;


    let photoHTML = "";


    if (selectedPhoto) {

        photoHTML = `

            <img
                src="${selectedPhoto}"
                class="profile-photo"
            >

        `;

    }


    card.innerHTML = `

        ${photoHTML}


        <div class="card-title">

            men haqimda malumot

        </div>


        <div class="card-name">

            ${escapeHTML(data.firstName)}

            ${escapeHTML(data.lastName)}

        </div>


        <div class="card-school">

        <div class="info-school">

                    Maktab

                </div>

            ${escapeHTML(data.school)}

        </div>


        <div class="card-info">


            <div class="info-item">

                <div class="info-label">

                    SINF

                </div>


                <div class="info-value">

                    ${escapeHTML(
                        data.className || "-"
                    )}

                </div>

            </div>



            <div class="info-item">

                <div class="info-label">

                    TUG‘ILGAN SANA

                </div>


                <div class="info-value">

                    ${formatDate(
                        data.birthDate
                    )}

                </div>

            </div>



            <div class="info-item">

                <div class="info-label">

                    SEVIMLI FAN

                </div>


                <div class="info-value">

                    ${escapeHTML(
                        data.subject || "-"
                    )}

                </div>

            </div>



            <div class="info-item">

                <div class="info-label">

                    QIZIQISHLAR

                </div>


                <div class="info-value">

                    ${escapeHTML(
                        data.hobby || "-"
                    )}

                </div>

            </div>


        </div>


        <div class="card-about">

            <strong>

                MEN HAQIMDA

            </strong>


            <br><br>


            ${escapeHTML(
                data.about ||
                "Ma’lumot kiritilmagan."
            )}

        </div>

    `;


    cardContainer.innerHTML = "";


    cardContainer.appendChild(card);


    resultBox.style.display = "block";


    resultBox.scrollIntoView({

        behavior: "smooth"

    });

}


/* KARTA YARATISH */

form.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        studentData = getData();


        createCard(studentData);

    }
);


/* YANA RANDOM DIZAYN */

againBtn.addEventListener(
    "click",
    function() {

        if (!studentData) return;


        createCard(studentData);

    }
);


/* RASM TANLASH */

document
    .getElementById("photo")
    .addEventListener(
        "change",
        function(event) {

            const file =
                event.target.files[0];


            if (!file) {

                selectedPhoto = null;

                return;

            }


            const reader =
                new FileReader();


            reader.onload =
                function(e) {

                    selectedPhoto =
                        e.target.result;

                };


            reader.readAsDataURL(file);

        }
    );


/* PNG YUKLASH */

downloadBtn.addEventListener(
    "click",
    async function() {

        const card =
            document.querySelector(
                ".student-card"
            );


        if (!card) return;


        const canvas =
            await html2canvas(
                card,
                {

                    scale: 3,

                    useCORS: true,

                    backgroundColor: null

                }
            );


        const link =
            document.createElement("a");


        link.download =
            "men haqimda malumot.png";


        link.href =
            canvas.toDataURL(
                "image/png"
            );


        link.click();

    }
);


/* SANANI O‘ZGARTIRISH */

function formatDate(date) {

    if (!date) return "-";


    const parts =
        date.split("-");


    if (parts.length !== 3) {

        return date;

    }


    return `${parts[2]}.${parts[1]}.${parts[0]}`;

}


/* XAVFSIZ MATN */

function escapeHTML(text) {

    return String(text)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}
