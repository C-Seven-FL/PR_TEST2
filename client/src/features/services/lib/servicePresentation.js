export function getServiceRatingText(avgRating) {
  return typeof avgRating === "number"
    ? `${avgRating.toFixed(1)} / 5`
    : "Zatím bez hodnocení";
}

export function getServiceCategoryLabel(service) {
  return service.category_name || service.category || "Kategorie";
}

export function getServiceId(service) {
  return service.id || service._id || service.name;
}
