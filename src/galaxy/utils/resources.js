export default getStaticResource;

let resources = Object.create(null);

getStaticResource.add = function add(key, value) {
  resources[key] = value;
}

function getStaticResource(name) {
  return resources[name];
}
