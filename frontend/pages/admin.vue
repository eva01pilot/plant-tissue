<template>
  <CommonTabs
    :current-tab="currentTab"
    @change-tab="(e) => changeTab(e)"
    :tabs="tabs"
    class=""
  >
    <template #content(components)>
      <div
        class="md:flex flex-col lg:flex-row w-full justify-center md:flex-[1_auto] overflow-auto max-h-full"
      >
        <AdminCreateElementForm class="w-full md:m-2" />
        <Separator
          orientation="vertical"
          class="shrink-0 bg-secondary w-px h-[unset] hidden md:visible"
        />
        <CommonDataTable
          :page-size="10"
          :columns="elementColumnDefs"
          :data="data"
          class="w-full md:mt-4 md:mx-2"
          @action="handleDeleteElement"
        />
      </div>
    </template>
    <template #content(mediums)>
      <div
        class="flex flex-col lg:flex-row w-full justify-center flex-[1_auto] overflow-auto"
      >
        <AdminCreateMediumForm class="w-full md:m-2" />
        <Separator
          orientation="vertical"
          class="shrink-0 bg-secondary w-px h-[unset] hidden md:visible"
        />
        <ScrollArea class="w-full">
          <div
            class="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-2 xl:p-6 overflow-y-auto md:w-full xl:mx-2"
          >
            <CommonMediumCard
              v-for="medium in mediumData"
              v-if="mediumData.length"
              @delete="medStore.deleteMedium(medium)"
              class="w-1/2.5"
              :medium="medium"
              :deletable="true"
              :component-data="medium.components"
            />
            <p v-else class="flex justify-center items-center w-full">
              Нет питательных сред
            </p>
          </div>
        </ScrollArea>
      </div>
    </template>
  </CommonTabs>
</template>

<script setup lang="tsx">
import { useWindowSize } from "@vueuse/core";
import type {
  Cell,
  ColumnDef,
  Row,
  RowData,
  RowModel,
} from "@tanstack/vue-table";
import type { ElementTable } from "@/store/elements";
import { elementsStore } from "@/store/elements";
import { mediumsStore } from "~/store/mediums";
import { Separator } from "@/components/ui/separator";
import { formatChemString } from "~/composables/useChemFormat";
import { Button } from "@/components/ui/button";
import ScrollArea from "~/components/ui/scroll-area/ScrollArea.vue";
import {
  LetterCaseCapitalizeIcon,
  TokensIcon,
  MixIcon,
  TrashIcon,
} from "@radix-icons/vue";
import Formula from "@/components/custom-icons/formula.vue";

interface Tab {
  name: "components" | "mediums";
  title: string;
}
interface Slide {
  name: "form" | "table";
  title: string;
}

const elemStore = elementsStore();
const medStore = mediumsStore();

const { getElements } = storeToRefs(elemStore);
const { getMediums } = storeToRefs(medStore);

onBeforeMount(async () => {
  await elemStore.getAllElements();
  await medStore.getAllMediums();
});

const data = computed(() => elemStore.getElements);
const mediumData = computed(() => medStore.getMediums);
const currentTab = ref<Tab["name"]>("components");
const { width, height } = useWindowSize();

definePageMeta({
  layout: "app-layout",
  middleware: ["is-logged-in", "is-admin"],
});
const tabs: Tab[] = [
  { title: "Компоненты", name: "components" },
  { title: "Питательные среды", name: "mediums" },
];

const slides: Slide[] = [
  {
    title: "Форма",
    name: "form",
  },
  {
    title: "Таблица",
    name: "table",
  },
];

const letterCapitalize = <LetterCaseCapitalizeIcon />;
const elementColumnDefs = ref<ColumnDef<ElementTable>[]>([
  {
    accessorKey: "name",
    header: () => {
      if (width.value <= 640) {
        console.log(LetterCaseCapitalizeIcon);
        return h("div", { class: "flex justify-center items-center" }, [
          h(letterCapitalize),
        ]);
      } else {
        return h("div", {
          class: "text-left font-medium text-red",
          innerHTML: "Название",
        });
      }
    },
  },
  {
    accessorKey: "formula",
    header: () => {
      if (width.value <= 640) {
        return h(
          "div",
          { class: "flex justify-center items-center w-[15px]" },
          [h(Formula)],
        );
      } else {
        return h("div", {
          class: "text-center font-medium text-red",
          innerHTML: "Формула",
        });
      }
    },
    cell: ({ row }) => {
      const formatted = formatChemString(row.getValue("formula"));
      return h("div", { class: "text-left font-medium", innerHTML: formatted });
    },
  },
  {
    accessorKey: "typeName",
    header: () => {
      if (width.value <= 640) {
        return h("div", { class: "flex justify-center items-center" }, [
          h(TokensIcon),
        ]);
      } else {
        return h("div", {
          class: "text-center font-medium text-red",
          innerHTML: "Тип",
        });
      }
    },
  },
  {
    accessorKey: "action",
    header: () => {
      if (width.value <= 640) {
        return h("div", { class: "flex justify-center items-center" }, [
          h(MixIcon),
        ]);
      } else {
        return h("div", {
          class: "text-center font-medium text-red",
          innerHTML: "Действие",
        });
      }
    },
    cell: ({ row }) => {
      if (width.value <= 640) {
        return h(Button, { variant: "destructive" }, [h(TrashIcon)]);
      } else {
        return h(Button, {
          innerHTML: "Удалить",
          variant: "destructive",
          onClick() {
            handleDeleteElement(row.original);
          },
        });
      }
    },
  },
]);

watch(
  width,
  (newVal,oldVal) => {
    if(newVal > oldVal && newVal < 640 && oldVal < 640 ) return
    if(newVal > oldVal && newVal > 640 && oldVal > 640 ) return
    if(newVal < oldVal && newVal > 640 && oldVal > 640) return
    if(newVal < oldVal && newVal < 640 && oldVal < 640) return
    console.log(oldVal, newVal)
    elementColumnDefs.value = [
      {
        accessorKey: "name",
        header: () => {
          if (width.value <= 640) {
            console.log(LetterCaseCapitalizeIcon);
            return h("div", { class: "flex justify-center items-center" }, [
              h(letterCapitalize),
            ]);
          } else {
            return h("div", {
              class: "text-left font-medium text-red",
              innerHTML: "Название",
            });
          }
        },
      },
      {
        accessorKey: "formula",
        header: () => {
          if (width.value <= 640) {
            return h(
              "div",
              { class: "flex justify-center items-center w-[15px]" },
              [h(Formula)],
            );
          } else {
            return h("div", {
              class: "text-center font-medium text-red",
              innerHTML: "Формула",
            });
          }
        },
        cell: ({ row }) => {
          const formatted = formatChemString(row.getValue("formula"));
          return h("div", {
            class: "text-left font-medium",
            innerHTML: formatted,
          });
        },
      },
      {
        accessorKey: "typeName",
        header: () => {
          if (width.value <= 640) {
            return h("div", { class: "flex justify-center items-center" }, [
              h(TokensIcon),
            ]);
          } else {
            return h("div", {
              class: "text-center font-medium text-red",
              innerHTML: "Тип",
            });
          }
        },
      },
      {
        accessorKey: "action",
        header: () => {
          if (width.value <= 640) {
            return h("div", { class: "flex justify-center items-center" }, [
              h(MixIcon),
            ]);
          } else {
            return h("div", {
              class: "text-center font-medium text-red",
              innerHTML: "Действие",
            });
          }
        },
        cell: ({ row }) => {
          if (width.value <= 640) {
            return h(Button, { variant: "destructive" }, [h(TrashIcon)]);
          } else {
            return h(Button, {
              innerHTML: "Удалить",
              variant: "destructive",
              onClick() {
                handleDeleteElement(row.original);
              },
            });
          }
        },
      },
    ];
  },
  { deep: true },
);
const handleDeleteElement = async (e: ElementTable) => {
  console.log("click");
  const element = e;
  await elemStore.deleteElement(element);
};
const changeTab = async (e: Tab["name"]) => {
  currentTab.value = e;
};
</script>
