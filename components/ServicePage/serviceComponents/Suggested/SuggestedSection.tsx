import Suggested from "./Suggested";

interface Props {
  categoryName: string;
  categories: ICategory[];
  deleteName: string;
}

async function getFindLastService(categoryName: string) {
  const services = await fetch(
    `${process.env.LOCAL_LIBRARY_API}library/search-by-category/?category=${encodeURIComponent(categoryName)}&amount=4`,
    {
      next: {
        revalidate: 60,
      },
    },
  );
  return services.json();
}

function deleteService(
  services: IServiceInterface[],
  deleteName: string,
): IServiceInterface[] {
  const freeServices: IServiceInterface[] = [];

  services.forEach((service) => {
    if (encodeURIComponent(service.name) !== deleteName) {
      freeServices.push(service);
    }
  });

  if (freeServices.length > 3) {
    freeServices.pop();
  }

  return freeServices;
}

export default async function SuggestedSection({
  categoryName,
  categories,
  deleteName,
}: Props) {
  const lastService = await getFindLastService(categoryName);
  const finishLastService = deleteService(
    Array.isArray(lastService) ? lastService : [],
    deleteName,
  );

  if (!finishLastService.length) {
    return null;
  }

  return <Suggested categories={categories} services={finishLastService} />;
}
