const KONTENT_PROJECT_ID = "Q26Y6NhW1iqHqbJLFe80";
const KONTENT_CT_ID = "erFecHFKFPJnTMSxNtob";

export const searchSchoolsByLocation = async ({
  uf,
  city,
}: {
  uf: string;
  city: string;
}) => {
  try {
    const response = await fetch(
      `https://knn-kontent-api-3joj56mh2q-rj.a.run.app/api/schools/searchByLocation?project=${KONTENT_PROJECT_ID}&contentType=${KONTENT_CT_ID}&uf=${uf}&city=${city}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": `${process.env.NEXT_PUBLIC_KONTENT_API_KEY}`,
        },
      }
    );
    const data = await response.json();

    return data.results || [];
  } catch (error) {
    console.error("Error fetching all pages:", error);
    return [];
  }
};

export const fetchAllSchools = async () => {
  try {
    const response = await fetch(
      `https://knn-kontent-api-3joj56mh2q-rj.a.run.app/api/pages?project=${KONTENT_PROJECT_ID}&contentType=${KONTENT_CT_ID}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": `${process.env.NEXT_PUBLIC_KONTENT_API_KEY}`,
        },
      }
    );
    const data = await response.json();

    return data.results || [];
  } catch (error) {
    console.error("Error fetching all pages:", error);
    return [];
  }
};

export const fetchUsers = async () => {
  const response = await fetch(`/api/getQuizUsers?_=${new Date().getTime()}`, {
    headers: {
      "Cache-Control": "no-cache",
    },
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
};
