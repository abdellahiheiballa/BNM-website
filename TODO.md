# TODO - Add "Ajouter une Actualité" page

- [ ] Inspect current Actualités pages/components to match existing UI/style
- [ ] Add backend endpoint to create an Actualité (POST /api/actualites)
  - [ ] Extend openapi.yaml with POST /actualites
  - [ ] Update api-server route implementation and DB insert
  - [ ] Regenerate api-client-react/api-zod
- [ ] Add frontend "Ajouter une Actualité" page at `/actualites/new`
  - [ ] Implement full form: titre, slug, categorie, contenu, image URL (or file path), datePublication (optional)
  - [ ] Submit via generated client mutation
  - [ ] Validate inputs (client-side) and show success/error
- [ ] Add navigation entry (button/link) from Actualites listing page
- [ ] Build/typecheck
- [ ] Test end-to-end: create an Actualité and verify appears in list

