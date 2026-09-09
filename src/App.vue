<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-icon class="q-mr-sm"/>
          Quasar Frontend
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="q-pa-lg page-background">
        <div class="content-wrapper">
          <div class="q-mb-lg">
            <div class="text-h4 text-weight-bold">Loyiha tayyor</div>
            <div class="text-subtitle1 text-grey-7 q-mt-sm">
              Quasar Framework Vue 3 bilan muvaffaqiyatli ulandi.
            </div>
          </div>

          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-4">
              <q-card flat bordered class="full-height">
                <q-card-section>
                  <q-icon name="speed" color="primary" size="32px"/>
                  <div class="text-h6 q-mt-md">Tezkor</div>
                  <div class="text-body2 text-grey-7 q-mt-sm">
                    Vite hot reload va Quasar komponentlari tayyor.
                  </div>
                </q-card-section>
              </q-card>
            </div>

            <div class="col-12 col-md-4">
              <q-card flat bordered class="full-height">
                <q-card-section>
                  <q-icon name="devices" color="secondary" size="32px"/>
                  <div class="text-h6 q-mt-md">Responsive</div>
                  <div class="text-body2 text-grey-7 q-mt-sm">
                    Mobil va desktop ekranlar uchun moslashuvchan layout.
                  </div>
                </q-card-section>
              </q-card>
            </div>

            <div class="col-12 col-md-4">
              <q-card flat bordered class="full-height">
                <q-card-section>
                  <q-icon name="check_circle" color="positive" size="32px"/>
                  <div class="text-h6 q-mt-md">Ishlayapti</div>
                  <div class="text-body2 text-grey-7 q-mt-sm">
                    QLayout, QHeader, QPage va QCard ishlatildi.
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
