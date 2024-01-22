import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Contact } from "../models/contact.model"

//query<Contact return type, number what will be passed to the query>
export const contactsApi = createApi({
  reducuerPath: "contactsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  tagTypes: ['Contact'], 
  endpoints: (builder: any) => ({
    contacts: builder.query<Contact[], void>({
      query: () => "/contacts",
      providesTags: ["Contact"]
    }),
    contact: builder.query<Contact, string>({
      query: (id) => `/contacts/${id}`,
      providesTags: ["Contact"]
    }),
    addContact: builder.mutation<void, Contact>({
      query: (contact) => ({
        url: "/contacts",
        method: "POST",
        body: contact,
      }),
      invalidatesTags: ["Contact"]
    }),
    updateContact: builder.mutation<void, Contact>({
      query: ({ id, ...rest }) => ({
        url: `/contacts/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Contact"]
    }),
    deleteContact: builder.mutation<void, string>({
      query: (id) => ({
        url: `/contacts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contact"]
    }),
  }),
})

export const {
  useContactsQuery,
  useContactQuery,
  useAddContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = contactsApi
